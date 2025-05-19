import { Position } from "@xyflow/react";

// Node Types
export const NODE_TYPES = {
  QUESTION: "question",
  FACT: "fact",
} as const;

// Edge Types
export const EDGE_TYPES = {
  QUESTION_FACT: "question-fact",
  DEPENDENCY: "dependency",
} as const;

// Dependency Types
export const DEPENDENCY_TYPES = {
  FULL: "full",
  PARTIAL: "partial",
} as const;

// Node ID Prefixes
export const NODE_PREFIXES = {
  QUESTION: "Q",
  FACT: "F",
} as const;

// Handle Positions
export const HANDLE_POSITIONS = {
  TOP: Position.Top,
  RIGHT: Position.Right,
  BOTTOM: Position.Bottom,
  LEFT: Position.Left,
} as const;

// Handle Name Suffixes
export const HANDLE_SUFFIXES = {
  SOURCE: {
    TOP: "-top-source",
    RIGHT: "-right-source",
    BOTTOM: "-bottom-source",
    LEFT: "-left-source",
  },
  TARGET: {
    TOP: "-top-target",
    RIGHT: "-right-target",
    BOTTOM: "-bottom-target",
    LEFT: "-left-target",
  },
} as const;
