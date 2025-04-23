import { Edge, Node } from "@xyflow/react";

export interface Handle {
  id: string;
  position: string;
}

export type QuestionaireNodeData = {
  targetHandles: Handle[];
  sourceHandles: Handle[];
};

export type QuestionNodeData = {
  title: string;
  guidelines: string;
} & QuestionaireNodeData;

export type FactNodeData = {
  title: string;
  guidelines: string;
  mandatory: boolean;
  default: boolean;
} & QuestionaireNodeData;

export type QuestionNode = Node<QuestionNodeData, "question">;

export type FactNode = Node<FactNodeData, "fact">;

export type DependencyEdge = Edge<{ type?: "full" | "partial" }, "dependency">;
