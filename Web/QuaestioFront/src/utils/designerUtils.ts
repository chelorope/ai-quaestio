import {
  NODE_TYPES,
  EDGE_TYPES,
  DEPENDENCY_TYPES,
  NODE_PREFIXES,
  HANDLE_POSITIONS,
  HANDLE_SUFFIXES,
} from "@/constants/designerConstants";
import { getNextId } from "./sliceUtils";
import {
  FactNode,
  QuestionNode,
  DesignerEdge,
  DependencyEdgeData,
  QuestionFactEdge,
} from "@/types/designer/Designer";

/**
 * Creates a handle ID from a node ID and handle suffix
 */
function createHandleId(nodeId: string, suffix: string): string {
  return `${nodeId}${suffix}`;
}

/**
 * Creates a question node with standardized structure
 */
export function createQuestionNode(
  id: string,
  title: string = "",
  guidelines: string = "",
  position = { x: 0, y: 0 }
): QuestionNode {
  return {
    id,
    type: NODE_TYPES.QUESTION,
    position,
    data: {
      title,
      guidelines,
      sourceHandles: [
        {
          id: createHandleId(id, HANDLE_SUFFIXES.SOURCE.BOTTOM),
          position: HANDLE_POSITIONS.BOTTOM,
        },
        {
          id: createHandleId(id, HANDLE_SUFFIXES.SOURCE.RIGHT),
          position: HANDLE_POSITIONS.RIGHT,
        },
      ],
      targetHandles: [
        {
          id: createHandleId(id, HANDLE_SUFFIXES.TARGET.TOP),
          position: HANDLE_POSITIONS.TOP,
        },
      ],
    },
  };
}

/**
 * Creates a new question node with an automatically generated ID
 */
export function createNewQuestionNode(
  questions: QuestionNode[],
  title: string = "",
  guidelines: string = "",
  position = { x: 0, y: 0 }
): QuestionNode {
  const newId = getNextId(NODE_PREFIXES.QUESTION, questions);
  return createQuestionNode(newId, title, guidelines, position);
}

/**
 * Creates a fact node with standardized structure
 */
export function createFactNode(
  id: string,
  title: string = "",
  guidelines: string = "",
  mandatory: boolean = false,
  isDefault: boolean = false,
  parentId?: string,
  position = { x: 0, y: 0 }
): FactNode {
  return {
    id,
    type: NODE_TYPES.FACT,
    position,
    parentId,
    data: {
      title,
      guidelines,
      mandatory,
      default: isDefault,
      sourceHandles: [
        {
          id: createHandleId(id, HANDLE_SUFFIXES.SOURCE.BOTTOM),
          position: HANDLE_POSITIONS.BOTTOM,
        },
      ],
      targetHandles: [
        {
          id: createHandleId(id, HANDLE_SUFFIXES.TARGET.TOP),
          position: HANDLE_POSITIONS.TOP,
        },
        {
          id: createHandleId(id, HANDLE_SUFFIXES.TARGET.LEFT),
          position: HANDLE_POSITIONS.LEFT,
        },
      ],
    },
  };
}

/**
 * Creates a new fact node with an automatically generated ID
 */
export function createNewFactNode(
  facts: FactNode[],
  title: string = "",
  guidelines: string = "",
  mandatory: boolean = false,
  isDefault: boolean = false,
  parentId?: string,
  position = { x: 0, y: 0 }
): FactNode {
  const newId = getNextId(NODE_PREFIXES.FACT, facts);
  return createFactNode(
    newId,
    title,
    guidelines,
    mandatory,
    isDefault,
    parentId,
    position
  );
}

/**
 * Creates a dependency edge between two nodes
 */
export function createDependencyEdge(
  sourceId: string,
  targetId: string,
  dependencyType: DependencyEdgeData["type"] = DEPENDENCY_TYPES.FULL,
  sourceHandle?: string,
  targetHandle?: string
): DesignerEdge {
  return {
    id: `${sourceId}-${targetId}`,
    source: sourceId,
    target: targetId,
    type: EDGE_TYPES.DEPENDENCY,
    data: { type: dependencyType },
    sourceHandle,
    targetHandle,
  };
}

/**
 * Creates an edge from a question to a fact
 */
export function createQuestionFactEdge(
  questionId: string,
  factId: string,
  sourceHandle?: string,
  targetHandle?: string
): QuestionFactEdge {
  return {
    id: `${questionId}-${factId}`,
    source: questionId,
    target: factId,
    type: EDGE_TYPES.QUESTION_FACT,
    data: {},
    sourceHandle:
      sourceHandle || createHandleId(questionId, HANDLE_SUFFIXES.SOURCE.RIGHT),
    targetHandle:
      targetHandle || createHandleId(factId, HANDLE_SUFFIXES.TARGET.LEFT),
  };
}
