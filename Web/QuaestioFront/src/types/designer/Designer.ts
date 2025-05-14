import { Edge, Node, Position, Viewport } from "@xyflow/react";
import {
  XMLQuestion,
  XMLFact,
  QMLObject,
  XMIQuestion,
  XMIFact,
  XMIConstraint,
  XMIObject,
} from "./xmlTypes";
import {
  UpdateNodeTitlePayload,
  UpdateNodeGuidelinesPayload,
  UpdateFactPropertiesPayload,
  UpdateConstraintPayload,
  UpdateFileDetailsPayload,
} from "./actionTypes";
import { DesignerSelector } from "./selectorTypes";

// Base types
export interface Handle {
  id: string;
  position: Position;
}

// Node data types
export interface BaseNodeData {
  [key: string]: unknown;
  targetHandles: Handle[];
  sourceHandles: Handle[];
}

export interface QuestionNodeData extends BaseNodeData {
  title: string;
  guidelines?: string;
}

export interface FactNodeData extends BaseNodeData {
  title: string;
  guidelines?: string;
  mandatory: boolean;
  default: boolean;
}

// Node types
export type QuestionNode = Node<QuestionNodeData, "question">;
export type FactNode = Node<FactNodeData, "fact">;
export type DesignerNode = QuestionNode | FactNode;

// Edge types
export interface DependencyEdgeData {
  [key: string]: unknown;
  type: "full" | "partial";
}

export type DependencyEdge = Edge<DependencyEdgeData, "dependency">;
export type QuestionFactEdge = Edge<Record<string, never>, "question-fact">;
export type DesignerEdge = DependencyEdge | QuestionFactEdge;

// File details
export interface FileDetails {
  name: string;
  reference?: string;
  author?: string;
}

// State types
export interface DesignerState {
  questions: QuestionNode[];
  facts: FactNode[];
  edges: DesignerEdge[];
  constraints: string[];
  fileDetails: FileDetails;
  viewport: Viewport;
}

// Re-export types from the new files
export type {
  XMLQuestion,
  XMLFact,
  QMLObject,
  XMIQuestion,
  XMIFact,
  XMIConstraint,
  XMIObject,
  UpdateNodeTitlePayload,
  UpdateNodeGuidelinesPayload,
  UpdateFactPropertiesPayload,
  UpdateConstraintPayload,
  UpdateFileDetailsPayload,
  DesignerSelector,
};
