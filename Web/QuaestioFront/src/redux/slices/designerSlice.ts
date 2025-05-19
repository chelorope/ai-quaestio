import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Connection,
  getNodesBounds,
  getViewportForBounds,
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
} from "@/types/designer/Designer";
import { RootState } from "../store";
import { updateNodeList } from "@/utils/sliceUtils";
import {
  createNewFactNode,
  createNewQuestionNode,
  createQuestionFactEdge,
  createDependencyEdge,
} from "@/utils/designerUtils";
import { NODE_TYPES, DEPENDENCY_TYPES } from "@/constants/designerConstants";

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
      const newNode = createNewQuestionNode(
        state.questions,
        "",
        "",
        action.payload.position || { x: 0, y: 0 }
      );

      state.questions = applyNodeChanges(
        [{ type: "add", item: newNode }],
        state.questions
      );
    },
    updateQuestionTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      state.questions = updateNodeList(
        state.questions,
        action.payload.id,
        (data) => ({ ...data, title: action.payload.title })
      );
    },
    updateQuestionGuidelines: (
      state,
      action: PayloadAction<{ id: string; guidelines: string }>
    ) => {
      state.questions = updateNodeList(
        state.questions,
        action.payload.id,
        (data) => ({ ...data, guidelines: action.payload.guidelines })
      );
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      state.questions = applyNodeChanges(
        [{ type: "remove", id: action.payload }],
        state.questions
      );
    },

    // FACTS REDUCERS
    addFact: (state, action: PayloadAction<Partial<FactNode>>) => {
      const newNode = createNewFactNode(
        state.facts,
        "",
        "",
        false,
        false,
        action.payload.parentId,
        action.payload.position || { x: 0, y: 0 }
      );

      state.facts = [...state.facts, newNode];

      if (action.payload.parentId) {
        const factEdge = createQuestionFactEdge(
          action.payload.parentId,
          newNode.id
        );
        state.edges = addEdge(factEdge, state.edges) as DesignerEdge[];
      }
    },
    updateFactTitle: (
      state,
      action: PayloadAction<{ id: string; title: string }>
    ) => {
      state.facts = updateNodeList(state.facts, action.payload.id, (data) => ({
        ...data,
        title: action.payload.title,
      }));
    },
    updateFactGuidelines: (
      state,
      action: PayloadAction<{ id: string; guidelines: string }>
    ) => {
      state.facts = updateNodeList(state.facts, action.payload.id, (data) => ({
        ...data,
        guidelines: action.payload.guidelines,
      }));
    },
    updateFactMandatory: (
      state,
      action: PayloadAction<{ id: string; mandatory: boolean }>
    ) => {
      state.facts = updateNodeList(state.facts, action.payload.id, (data) => ({
        ...data,
        mandatory: action.payload.mandatory,
      }));
    },
    updateFactDefault: (
      state,
      action: PayloadAction<{ id: string; default: boolean }>
    ) => {
      state.facts = updateNodeList(state.facts, action.payload.id, (data) => ({
        ...data,
        default: action.payload.default,
      }));
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
        (sourceNode.type === NODE_TYPES.QUESTION &&
          targetNode.type === NODE_TYPES.QUESTION)
      )
        return;

      // Add edge according to type
      if (
        sourceNode.type === NODE_TYPES.QUESTION &&
        targetNode.type === NODE_TYPES.FACT
      ) {
        // Question to fact connection
        const edge = createQuestionFactEdge(
          sourceNode.id,
          targetNode.id,
          action.payload.sourceHandle || undefined,
          action.payload.targetHandle || undefined
        );
        state.edges = addEdge(edge, state.edges) as DesignerEdge[];
      } else {
        // Dependency connection
        const dependencyEdge = createDependencyEdge(
          sourceNode.id,
          targetNode.id,
          DEPENDENCY_TYPES.FULL,
          action.payload.sourceHandle || undefined,
          action.payload.targetHandle || undefined
        );
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
