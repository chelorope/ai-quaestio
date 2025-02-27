import { Node } from "@xyflow/react";
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
  "elk.spacing.nodeNode": "50",
  "elk.spacing.componentComponent": "100",
};

const elkToFlowNode = (elkNode: ElkNode): Partial<Node> => ({
  ...elkNode,
  position: { x: elkNode.x || 0, y: elkNode.y || 0 },
});

export async function getLayoutedElements(
  questions,
  facts,
  edges,
  options = {}
) {
  // const isHorizontal = options?.["elk.direction"] === "RIGHT";
  console.log("QUESTIONS", questions);
  console.log("FACTS", facts);
  console.log("EDGES", edges);
  const graph = {
    id: "root",
    layoutOptions: { ...elkOptions, ...options },
    children: [
      ...questions.map((question) => ({
        ...question,
        width: 245,
        height: 53,
        layoutOptions: {
          "partitioning.partition": "1",
        },
      })),
      ...facts.map((fact) => ({
        ...fact,
        width: 245,
        height: 53,
        layoutOptions: {
          "partitioning.partition": "2",
        },
      })),
    ],
    edges: edges,
  };
  console.log("GRAPH", graph);
  return elk
    .layout(graph)
    .then((layoutedGraph) => ({
      nodes: layoutedGraph?.children?.map((node) => elkToFlowNode(node)),
      edges: layoutedGraph.edges,
    }))
    .catch(console.error);
}
