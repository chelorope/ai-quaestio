import { Edge, Node } from "@xyflow/react";

export interface Handle {
  id: string;
  position: string;
}

export type QuestionaireNodeData = {
  targetHandles: Handle[];
  sourceHandles: Handle[];
};

export type QuestionaireNode = Node<QuestionaireNodeData>;

export type DependencyEdge = Edge<{ type?: "full" | "partial" }>;
