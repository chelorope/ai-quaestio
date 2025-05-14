import { Position } from "@xyflow/react";
import {
  FactNode,
  QuestionNode,
  DependencyEdge,
  QuestionFactEdge,
} from "@/types/designer/Designer";

export const createFactNode = (
  id: string,
  title: string,
  guidelines?: string,
  isMandatory = false,
  isDefault = false
): FactNode => ({
  id,
  type: "fact",
  position: { x: 0, y: 0 },
  data: {
    title,
    guidelines,
    mandatory: isMandatory,
    default: isDefault,
    targetHandles: [
      { id: `${id}-top-target`, position: Position.Top },
      { id: `${id}-left-target`, position: Position.Left },
    ],
    sourceHandles: [{ id: `${id}-bottom-source`, position: Position.Bottom }],
  },
});

export const createQuestionNode = (
  id: string,
  title: string,
  guidelines?: string
): QuestionNode => ({
  id,
  type: "question",
  position: { x: 0, y: 0 },
  data: {
    title,
    guidelines,
    targetHandles: [{ id: `${id}-top-target`, position: Position.Top }],
    sourceHandles: [
      { id: `${id}-bottom-source`, position: Position.Bottom },
      { id: `${id}-right-source`, position: Position.Right },
    ],
  },
});

export const createDependencyEdge = (
  source: string,
  target: string,
  type: "full" | "partial"
): DependencyEdge => ({
  id: `${source}-${target}`,
  type: "dependency",
  sourceHandle: `${source}-bottom-source`,
  source,
  targetHandle: `${target}-top-target`,
  target,
  data: { type },
});

export const createQuestionFactEdge = (
  questionId: string,
  factId: string
): QuestionFactEdge => ({
  id: `${questionId}-${factId}`,
  sourceHandle: `${questionId}-right-source`,
  source: questionId,
  targetHandle: `${factId}-left-target`,
  target: factId,
  data: {},
});
