import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Edge,
  Position,
  getNodesBounds,
  getViewportForBounds,
  Connection,
  Viewport,
} from "@xyflow/react";
import { isBrowser } from "@/utils";
import { flowLayout } from "../thunks/designerThunks";
import { DependencyEdge, FactNode, QuestionNode } from "@/types/Flow";

interface DesignerState {
  viewport: Viewport;
  questions: QuestionNode[];
  facts: FactNode[];
  edges: Edge[];
  constraints: string[];
  fileDetails: {
    author: string;
    name: string;
    reference: string;
  };
}

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

export const getInitialState = (initial?: boolean) =>
  JSON.parse(
    persistedState && !initial ? persistedState : JSON.stringify(initialState)
  );

export const designer = createSlice({
  name: "designer",
  initialState: getInitialState(),
  reducers: {
    resetState: () => {
      return getInitialState(true);
    },
    setState: (state, action) => {
      return action.payload;
    },
    // EDGE REDUCERS
    setEdges: (state, action: PayloadAction<DependencyEdge[]>) => {
      state.edges = action.payload;
    },
    updateDependencyEdgeType: (state, action) => {
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
          questions.push(node);
        } else if (node.type === "fact") {
          facts.push(node);
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

      const factEdge: Edge = {
        id: `${newId}-fact-${action.payload.parentId}`,
        sourceHandle: `${action.payload.parentId}-right-source`,
        source: action.payload.parentId || "",
        targetHandle: `${newId}-left-target`,
        target: newId,
      };
      state.edges = addEdge(factEdge, state.edges);
    },
    updateFactTitle: (state, action) => {
      state.facts = state.facts.map((fact) => {
        if (fact.id === action.payload.id) {
          fact.data = { ...fact.data, title: action.payload.title };
        }
        return fact;
      });
    },
    updateFactGuidelines: (state, action) => {
      state.facts = state.facts.map((fact) => {
        if (fact.id === action.payload.id) {
          fact.data = { ...fact.data, guidelines: action.payload.guidelines };
        }
        return fact;
      });
    },
    updateFactMandatory: (state, action) => {
      state.facts = state.facts.map((fact) => {
        if (fact.id === action.payload.id) {
          fact.data = { ...fact.data, mandatory: action.payload.mandatory };
        }
        return fact;
      });
    },
    updateFactDefault: (state, action) => {
      state.facts = state.facts.map((fact) => {
        if (fact.id === action.payload.id) {
          fact.data = { ...fact.data, default: action.payload.default };
        }
        return fact;
      });
    },
    removeFact: (state, action) => {
      state.facts = state.facts.filter((fact) => fact.id !== action.payload);
    },

    // FLOW REDUCERS
    centerView: (state) => {
      const nodes = [...state.questions, ...state.facts];
      if (nodes.length === 0) return;

      const bounds = getNodesBounds(nodes);
      const viewport = getViewportForBounds(
        bounds,
        state.viewport.width ?? 800,
        state.viewport.height ?? 600,
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
    onViewportChange: (state, action) => {
      state.viewport = action.payload;
    },
    onNodesChange: (state, action) => {
      state.questions = applyNodeChanges(action.payload, state.questions);
      state.facts = applyNodeChanges(action.payload, state.facts);
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action: PayloadAction<Connection>) => {
      const nodes = selectNodes({ designer: state });
      const sourceNode = nodes.find(
        (node) => action.payload.source === node.id
      );
      const targetNode = nodes.find(
        (node) => action.payload.target === node.id
      );
      // Connections rules
      if (
        sourceNode.id === targetNode.id ||
        (sourceNode.type === "question" &&
          action.payload.sourceHandle?.endsWith("right-source")) ||
        (sourceNode.type === "question" &&
          action.payload.targetHandle?.endsWith("right-target")) ||
        (sourceNode.type === "fact" &&
          action.payload.targetHandle?.endsWith("left-target"))
      ) {
        return;
      }

      if (
        (sourceNode.type === "question" && targetNode.type === "question") ||
        (sourceNode.type === "fact" && targetNode.type === "fact")
      ) {
        const newEdge: DependencyEdge = {
          id: `${action.payload.source}-${action.payload.target}`,
          ...action.payload,
          type: "dependency",
          selected: true,
          data: { type: "full" },
        };
        state.edges = addEdge(newEdge, state.edges);
      }
    },

    // QUESTIONAIRE REDUCERS
    addConstraint: (state, action) => {
      const index = action.payload;
      state.constraints = [
        ...state.constraints.slice(0, index),
        "",
        ...state.constraints.slice(index),
      ];
    },
    updateConstraints: (state, action) => {
      state.constraints[action.payload.index] = action.payload.value;
    },
    removeConstraint: (state, action) => {
      state.constraints = state.constraints.filter(
        (_, index) => index !== action.payload
      );
    },
    updateFileDetails: (state, action) => {
      state.fileDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(flowLayout.fulfilled, () => {});
  },
});

export const {
  setState,
  resetState,
  // Flow
  onViewportChange,
  onNodesChange,
  onEdgesChange,
  onConnect,
  setNodes,
  setEdges,
  updateDependencyEdgeType,
  centerView,
  // Questions,
  addQuestion,
  updateQuestionTitle,
  updateQuestionGuidelines,
  removeQuestion,
  // Facts
  addFact,
  updateFactTitle,
  updateFactGuidelines,
  updateFactMandatory,
  updateFactDefault,
  removeFact,
  // Questionaire
  addConstraint,
  updateConstraints,
  removeConstraint,
  updateFileDetails,
} = designer.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.designer.value;

export const selectQuestions = (state) => state.designer.questions;
export const selectFacts = (state) => state.designer.facts;

export const selectNodes = createSelector(
  [selectQuestions, selectFacts],
  (questions, facts) => [...questions, ...facts]
);
export const selectEdges = (state) => state.designer.edges;

export const selectQuestion = (questionId) =>
  createSelector([selectQuestions], (questions) => {
    return questions.find((question) => question.id === questionId);
  });

export const selectFact = (factId) =>
  createSelector([selectFacts], (facts) => {
    return facts.find((fact) => fact.id === factId);
  });

export const selectQuestionFacts = (questionId) =>
  createSelector([selectFacts], (facts) => {
    return facts.filter((fact) => fact.parentId === questionId);
  });

export const selectConstraints = (state) => state.designer.constraints;

export const selectViewport = (state) => state.designer.viewport;

export default designer.reducer;
