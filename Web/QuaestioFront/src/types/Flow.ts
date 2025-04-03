import { Edge, Node } from "@xyflow/react";

export interface Handle {
  id: string;
  position: string;
}

export type QuestionaireNodeData = {
  targetHandles: Handle[];
  sourceHandles: Handle[];
};

export interface QuestionNodeData extends QuestionaireNodeData {
  description: string;
  guidelines: string;
}

export interface FactNodeData extends QuestionaireNodeData {
  description: string;
  guidelines: string;
  mandatory: boolean;
  default: boolean;
}

export type QuestionaireNode = Node<QuestionaireNodeData>;

export type DependencyEdge = Edge<{ type?: "full" | "partial" }>;
