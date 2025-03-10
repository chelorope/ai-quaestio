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
  "elk.partitioning.activate": "true",
  // "elk.layered.layering.layeringStrategy": "LONGEST_PATH",
  "elk.layered.spacing.componentComponent": "100",
};

const defaultElkGroupOptions = {
  "elk.algorithm": "layered",
  "elk.direction": "DOWN",
  "elk.layered.spacing.nodeNodeBetweenLayers": "100",
  "elk.spacing.nodeNode": "100",
  "elk.padding": "[top=100,left=500,bottom=0,right=0]",
  // "elk.layered.nodePlacement.strategy": "SIMPLE",
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
      side: flowHandlePositionsMap[handle.position],
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
      {
        id: "questions",
        layoutOptions: {
          ...defaultElkGroupOptions,
          "partitioning.partition": "1",
        },
        children: questions.map((question) => {
          return {
            ...question,
            width: question.measured.width || 245,
            height: question.measured.height || 53,
            properties: {
              "org.eclipse.elk.portConstraints": "FIXED_ORDER",
            },
            ports: [
              { id: question.id },
              ...portsFromHandles(question.data.targetHandles),
              ...portsFromHandles(question.data.sourceHandles),
            ],
          };
        }),
      },
      {
        id: "facts",
        layoutOptions: {
          ...defaultElkGroupOptions,
          "partitioning.partition": "2",
        },
        children: facts.map((fact) => {
          return {
            ...fact,
            width: fact.measured.width || 245,
            height: fact.measured.height || 53,
            properties: {
              "org.eclipse.elk.portConstraints": "FIXED_ORDER",
            },
            ports: [
              { id: fact.id },
              ...portsFromHandles(fact.data.targetHandles),
              ...portsFromHandles(fact.data.sourceHandles),
            ],
          };
        }),
      },
    ],
    edges: edges,
  };
  console.log("GRAPH", graph);
  return elk
    .layout(graph)
    .then((layoutedGraph) => {
      return {
        questions: elkToFlowNodes(
          questions,
          layoutedGraph.children?.find((child) => child.id === "questions")
            ?.children
        ),
        facts: elkToFlowNodes(
          facts,
          layoutedGraph.children?.find((child) => child.id === "facts")
            ?.children
        ),
        edges: edges,
      };
    })
    .catch(console.error);
}
