import { Node, Position } from "@xyflow/react";
import ELK, { ElkNode } from "elkjs/lib/elk.bundled.js";

const elk = new ELK();
// Elk has a *huge* amount of options to configure. To see everything you can
// tweak check out:
//
// - https://www.eclipse.org/elk/reference/algorithms.html
// - https://www.eclipse.org/elk/reference/options.html
const elkOptions = {
  "elk.algorithm": "layered",
  "elk.direction": "DOWN",
  "elk.alg.libavoid.crossingPenalty": "100",
  // "elk.alg.libavoid.anglePenalty": "100",
  "elk.partitioning.activate": "true",
  "elk.spacing.nodeNode": "60",
  "elk.layered.spacing.nodeNodeBetweenLayers": "0",
};

const flowHandlePositionsMap = {
  [Position.Right]: "EAST",
  [Position.Left]: "WEST",
  [Position.Top]: "NORTH",
  [Position.Bottom]: "SOUTH",
};

const elkToFlowNodes = (flowNodes, elkNodes: ElkNode[] = []): Partial<Node> =>
  flowNodes.map((flowNode) => {
    const elkNode = elkNodes?.find((lgNode) => lgNode.id === flowNode.id);
    return {
      ...flowNode,
      position: { x: elkNode?.x || 0, y: elkNode?.y || 0 },
    };
  });

const portsFromHandles = (handles: { id: string; position: string }[] = []) =>
  handles.map((handle) => ({
    id: handle.id,
    properties: {
      "port.side": flowHandlePositionsMap[handle.position],
    },
  }));

export async function getLayoutedElements(
  questions,
  facts,
  edges,
  options = {}
) {
  const graph = {
    id: "root",
    layoutOptions: { ...elkOptions, ...options },
    children: [
      ...questions.map((question) => {
        return {
          ...question,
          width: question.measured.width || 245,
          height: question.measured.height || 53,
          properties: {
            "org.eclipse.elk.portConstraints": "FIXED_ORDER",
            "partitioning.partition": "1",
          },
          ports: [
            ...portsFromHandles(question.data.targetHandles),
            ...portsFromHandles(question.data.sourceHandles),
          ],
        };
      }),
      ...facts.map((fact) => {
        return {
          ...fact,
          width: fact.measured.width || 245,
          height: fact.measured.height || 53,
          properties: {
            "org.eclipse.elk.portConstraints": "FIXED_ORDER",
            "partitioning.partition": "2",
          },
          ports: [
            ...portsFromHandles(fact.data.targetHandles),
            ...portsFromHandles(fact.data.sourceHandles),
          ],
        };
      }),
    ],
    edges: edges,
  };
  return elk
    .layout(graph)
    .then((layoutedGraph) => {
      return {
        nodes: elkToFlowNodes([...questions, ...facts], layoutedGraph.children),
        edges: edges,
      };
    })
    .catch(console.error);
}
