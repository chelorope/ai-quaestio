import {
  DependencyEdge,
  FactNode,
  Handle,
  QuestionNode,
} from "@/types/designer/Designer";
import { Position } from "@xyflow/react";
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

const elkToFlowNodes = (
  flowNodes: (QuestionNode | FactNode)[],
  elkNodes: ElkNode[] = []
): (QuestionNode | FactNode)[] =>
  flowNodes.map((flowNode) => {
    const elkNode = elkNodes?.find((lgNode) => lgNode.id === flowNode.id);
    return {
      ...flowNode,
      position: { x: elkNode?.x || 0, y: elkNode?.y || 0 },
    };
  });

const portsFromHandles = (handles: Handle[] = []) =>
  handles.map((handle) => ({
    id: handle.id,
    properties: {
      "port.side": flowHandlePositionsMap[handle.position],
    },
  }));

const childrenFromNodes = (
  nodes: (QuestionNode | FactNode)[],
  partition: number
) =>
  nodes.map((node) => ({
    ...node,
    id: node.id,
    width: node.measured?.width || 245,
    height: node.measured?.height || 53,
    properties: {
      "org.eclipse.elk.portConstraints": "FIXED_ORDER",
      "partitioning.partition": partition.toString(),
    },
    ports: [
      ...portsFromHandles(node.data.targetHandles),
      ...portsFromHandles(node.data.sourceHandles),
    ],
  }));

export async function getLayoutedElements(
  questions: QuestionNode[],
  facts: FactNode[],
  edges: DependencyEdge[],
  options = {}
) {
  const graph = {
    id: "root",
    layoutOptions: { ...elkOptions, ...options },
    children: [
      ...childrenFromNodes(questions, 1),
      ...childrenFromNodes(facts, 2),
    ],
    edges: edges.map((edge) => ({
      ...edge,
      sources: [edge.source],
      targets: [edge.target],
    })),
  };

  try {
    const layoutedGraph = await elk.layout(graph);
    return {
      nodes: elkToFlowNodes([...questions, ...facts], layoutedGraph.children),
      edges: edges,
    };
  } catch (error) {
    console.error(error);
  }
}
