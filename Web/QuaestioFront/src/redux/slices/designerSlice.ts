import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Position,
  getNodesBounds,
  getViewportForBounds,
  Connection,
  Viewport as XYFlowViewport,
} from "@xyflow/react";
import { isBrowser } from "@/utils";
import { flowLayout } from "../thunks/designerThunks";
import {
  FactNode,
  QuestionNode,
  DesignerState,
  DesignerEdge,
  DependencyEdgeData,
  QuestionFactEdge,
} from "@/types/designer/Designer";
import { RootState } from "../store";

const initialState: DesignerState = {
  viewport: { x: 0, y: 0, zoom: 1 },
  questions: [],
  facts: [],
  edges: [],
  constraints: [""],
  fileDetails: {
    author: "",
    name: "",
    reference: "",
  },
};

const persistedState = isBrowser() && localStorage.getItem("flow");

export const getInitialState = (initial?: boolean): DesignerState =>
  JSON.parse(
    persistedState && !initial ? persistedState : JSON.stringify(initialState)
  );

export const designer = createSlice({
  name: "designer",
  initialState: getInitialState,
  reducers: {
    resetState: () => {
      return getInitialState(true);
    },
    setState: (state, action: PayloadAction<DesignerState>) => {
      return action.payload;
    },
    // EDGE REDUCERS
    setEdges: (state, action: PayloadAction<DesignerEdge[]>) => {
      state.edges = action.payload;
    },
    updateDependencyEdgeType: (
      state,
      action: PayloadAction<{ id: string; type: DependencyEdgeData["type"] }>
    ) => {
      state.edges = state.edges.map((edge) => {
        if (edge.id === action.payload.id) {
          edge.data = { ...edge.data, type: action.payload.type };
        }
        return edge;
      });
    },

    setNodes: (state, action: PayloadAction<(QuestionNode | FactNode)[]>) => {
      const questions = [] as QuestionNode[];
      const facts = [] as FactNode[];
      action.payload.forEach((node) => {
        if (node.type === "question") {
          questions.push(node as QuestionNode);
        } else if (node.type === "fact") {
          facts.push(node as FactNode);
        }
      });
      state.questions = questions;
      state.facts = facts;
    },

    // QUESTION REDUCERS
    addQuestion: (state, action: PayloadAction<Partial<QuestionNode>>) => {
      const lastId = state.questions[state.questions.length - 1]?.id || "Q0";
      const newId = `Q${Number(lastId.replace("Q", "")) + 1}`;
      const newNode: QuestionNode = {
        ...action.payload,
        position: action.payload.position || { x: 0, y: 0 },
        id: newId,
        type: "question",
        data: {
          title: "",
          guidelines: "",
          sourceHandles: [
            { id: `${newId}-bottom-source`, position: Position.Bottom },
            { id: `${newId}-right-source`, position: Position.Right },
          ],
          targetHandles: [
            { id: `${newId}-top-target`, position: Position.Top },
          ],
        },
      };

      state.questions = applyNodeChanges(
        [{ type: "add", item: newNode }],
        state.questions
      );
    },
    updateQuestionTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      state.questions = state.questions.map((question) => {
        if (question.id === action.payload.id) {
          question.data = { ...question.data, title: action.payload.title };
        }
        return question;
      });
    },
    updateQuestionGuidelines: (
      state,
      action: PayloadAction<{ id: string; guidelines: string }>
    ) => {
      state.questions = state.questions.map((question) => {
        if (question.id === action.payload.id) {
          question.data = {
            ...question.data,
            guidelines: action.payload.guidelines,
          };
        }
        return question;
      });
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      state.questions = applyNodeChanges(
        [{ type: "remove", id: action.payload }],
        state.questions
      );
    },

    // FACTS REDUCERS
    addFact: (state, action: PayloadAction<Partial<FactNode>>) => {
      const lastId = state.facts[state.facts.length - 1]?.id || "F0";
      const newId = `F${Number(lastId.replace("F", "")) + 1}`;

      const newNode: FactNode = {
        ...action.payload,
        position: action.payload.position || { x: 0, y: 0 },
        id: newId,
        type: "fact",
        data: {
          title: "",
          guidelines: "",
          mandatory: false,
          default: false,
          sourceHandles: [
            { id: `${newId}-bottom-source`, position: Position.Bottom },
          ],
          targetHandles: [
            { id: `${newId}-top-target`, position: Position.Top },
            { id: `${newId}-left-target`, position: Position.Left },
          ],
        },
      };
      state.facts = [...state.facts, newNode];

      const factEdge: QuestionFactEdge = {
        id: `${newId}-fact-${action.payload.parentId}`,
        sourceHandle: `${action.payload.parentId}-right-source`,
        source: action.payload.parentId || "",
        targetHandle: `${newId}-left-target`,
        target: newId,
        type: "question-fact",
        data: {},
      };
      state.edges = addEdge(factEdge, state.edges) as DesignerEdge[];
    },
    updateFactTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      state.facts = state.facts.map((fact) => {
        if (fact.id === action.payload.id) {
          fact.data = { ...fact.data, title: action.payload.title };
        }
        return fact;
      });
    },
    updateFactGuidelines: (
      state,
      action: PayloadAction<{ id: string; guidelines: string }>
    ) => {
      state.facts = state.facts.map((fact) => {
        if (fact.id === action.payload.id) {
          fact.data = { ...fact.data, guidelines: action.payload.guidelines };
        }
        return fact;
      });
    },
    updateFactMandatory: (
      state,
      action: PayloadAction<{ id: string; mandatory: boolean }>
    ) => {
      state.facts = state.facts.map((fact) => {
        if (fact.id === action.payload.id) {
          fact.data = { ...fact.data, mandatory: action.payload.mandatory };
        }
        return fact;
      });
    },
    updateFactDefault: (
      state,
      action: PayloadAction<{ id: string; default: boolean }>
    ) => {
      state.facts = state.facts.map((fact) => {
        if (fact.id === action.payload.id) {
          fact.data = { ...fact.data, default: action.payload.default };
        }
        return fact;
      });
    },
    removeFact: (state, action: PayloadAction<string>) => {
      state.facts = state.facts.filter((fact) => fact.id !== action.payload);
    },

    // FLOW REDUCERS
    centerView: (state) => {
      const nodes = [...state.questions, ...state.facts];
      if (nodes.length === 0) return;

      const bounds = getNodesBounds(nodes);
      const viewportDimensions = {
        width: 800,
        height: 600,
      };

      const viewport = getViewportForBounds(
        bounds,
        viewportDimensions.width,
        viewportDimensions.height,
        0,
        2,
        0.4
      );

      state.viewport = {
        x: viewport.x,
        y: viewport.y,
        zoom: viewport.zoom,
      };
    },
    onViewportChange: (state, action: PayloadAction<XYFlowViewport>) => {
      state.viewport = action.payload;
    },
    onNodesChange: (state, action) => {
      state.questions = applyNodeChanges(action.payload, state.questions);
      state.facts = applyNodeChanges(action.payload, state.facts);
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(
        action.payload,
        state.edges
      ) as DesignerEdge[];
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      const nodes = [...state.questions, ...state.facts];
      const sourceNode = nodes.find(
        (node) => action.payload.source === node.id
      );
      const targetNode = nodes.find(
        (node) => action.payload.target === node.id
      );

      // Ensure nodes are defined before proceeding
      if (!sourceNode || !targetNode) return;

      // Connections rules
      if (
        sourceNode.id === targetNode.id ||
        (sourceNode.type === "question" && targetNode.type === "question")
      )
        return;

      // Add edge according to type
      if (sourceNode.type === "question" && targetNode.type === "fact") {
        // Question to fact connection
        const edge: DesignerEdge = {
          id: `${sourceNode.id}-${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
          type: "question-fact",
          data: {},
          sourceHandle: action.payload.sourceHandle,
          targetHandle: action.payload.targetHandle,
        };
        state.edges = addEdge(edge, state.edges) as DesignerEdge[];
      } else {
        // Dependency connection
        const dependencyEdge: DesignerEdge = {
          id: `${sourceNode.id}-${targetNode.id}`,
          source: sourceNode.id,
          target: targetNode.id,
          type: "dependency",
          data: { type: "full" },
          sourceHandle: action.payload.sourceHandle,
          targetHandle: action.payload.targetHandle,
        };
        state.edges = addEdge(dependencyEdge, state.edges) as DesignerEdge[];
      }
    },

    // CONSTRAINT REDUCERS
    setConstraints: (state, action: PayloadAction<string[]>) => {
      state.constraints = action.payload;
    },
    updateConstraint: (
      state,
      action: PayloadAction<{ index: number; value: string }>
    ) => {
      state.constraints[action.payload.index] = action.payload.value;
    },
    addConstraint: (state) => {
      state.constraints.push("");
    },
    removeConstraint: (state, action: PayloadAction<number>) => {
      state.constraints = state.constraints.filter(
        (_, index) => index !== action.payload
      );
    },
    // FILE DETAILS REDUCERS
    setFileDetails: (
      state,
      action: PayloadAction<
        Partial<{
          name: string;
          author: string;
          reference: string;
        }>
      >
    ) => {
      state.fileDetails = {
        ...state.fileDetails,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(flowLayout.fulfilled, () => {});
  },
});

export const {
  resetState,
  setState,
  setEdges,
  updateDependencyEdgeType,
  setNodes,
  addQuestion,
  updateQuestionTitle,
  updateQuestionGuidelines,
  removeQuestion,
  addFact,
  updateFactTitle,
  updateFactGuidelines,
  updateFactMandatory,
  updateFactDefault,
  removeFact,
  centerView,
  onViewportChange,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setConstraints,
  updateConstraint,
  addConstraint,
  removeConstraint,
  setFileDetails,
} = designer.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file.
export const selectQuestions = (state: RootState) => state.designer.questions;
export const selectFacts = (state: RootState) => state.designer.facts;

export const selectNodes = createSelector(
  [selectQuestions, selectFacts],
  (questions, facts) => [...questions, ...facts]
);

export const selectEdges = (state: RootState) => state.designer.edges;

export const selectQuestion = (questionId: string) =>
  createSelector([selectQuestions], (questions) => {
    return questions.find((question) => question.id === questionId);
  });

export const selectFact = (factId: string) =>
  createSelector([selectFacts], (facts) => {
    return facts.find((fact) => fact.id === factId);
  });

export const selectQuestionFacts = (questionId: string) =>
  createSelector([selectFacts], (facts) => {
    return facts.filter((fact) => fact.parentId === questionId);
  });

export const selectConstraints = (state: RootState) =>
  state.designer.constraints;

export const selectViewport = (state: RootState) => state.designer.viewport;

export default designer.reducer;
