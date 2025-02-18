import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  MarkerType,
} from "@xyflow/react";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FlowState {
  questions: Node[];
  facts: Node[];
  edges: Edge[];
  constraints: string;
}

const initialState: FlowState = {
  questions: [],
  facts: [],
  edges: [],
  constraints: "",
};

interface AddEdgePayload {
  source: string;
  target: string;
}

// const getInitialQuestion = ({ id, ...flowProps }: Node): Node => ({
//   id,
//   ...flowProps,
// });

export const flow = createSlice({
  name: "flow",
  initialState,
  reducers: {
    // EDGE REDUCERS
    setEdges: (state, action) => {
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

    // QUESTION REDUCERS

    addQuestion: (state, action) => {
      const lastId = state.questions[state.questions.length - 1]?.id || "Q0";
      const newId = `Q${Number(lastId.replace("Q", "")) + 1}`;
      const newNode = {
        ...action.payload,
        id: newId,
        type: "question",
        data: { title: "", guidelines: "" },
      };

      state.questions = applyNodeChanges(
        [{ type: "add", item: newNode }],
        state.questions
      );
    },
    updateQuestionTitle: (state, action) => {
      state.questions = state.questions.map((question) => {
        if (question.id === action.payload.id) {
          question.data = { ...question.data, title: action.payload.title };
        }
        return question;
      });
    },
    updateQuestionGuidelines: (state, action) => {
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
    removeQuestion: (state, action) => {
      state.questions = applyNodeChanges(
        [{ type: "remove", id: action.payload }],
        state.questions
      );
    },

    // FACTS REDUCERS

    addFact: (state, action) => {
      console.log("addFact", action.payload);
      const lastId = state.facts[state.facts.length - 1]?.id || "F0";
      const newId = `F${Number(lastId.replace("F", "")) + 1}`;
      const newNode = {
        ...action.payload,
        id: newId,
        type: "fact",
        data: { title: "", guidelines: "", mandatory: false, default: false },
      };
      state.facts = [...state.facts, newNode];

      const factEdge = {
        sourceHandle: "right-source",
        source: action.payload.parentId,
        targetHandle: "left-target",
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

    // FLOW CALLBACK REDUCERS

    onNodesChange: (state, action) => {
      state.questions = applyNodeChanges(action.payload, state.questions);
      state.facts = applyNodeChanges(action.payload, state.facts);
    },
    onEdgesChange: (state, action) => {
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    onConnect: (state, action) => {
      const nodes = selectNodes({ flow: state });
      const sourceNode = nodes.find(
        (node) => action.payload.source === node.id
      );
      const targetNode = nodes.find(
        (node) => action.payload.target === node.id
      );

      console.log("handle onConnect", action.payload, sourceNode, targetNode);

      // Connections rules
      if (
        (sourceNode.type === "fact" && targetNode.type === "question") ||
        (sourceNode.type === "question" && targetNode.type === "fact") ||
        sourceNode.id === targetNode.id ||
        (sourceNode.type === "question" &&
          action.payload.sourceHandle === "right-source") ||
        (sourceNode.type === "question" &&
          action.payload.targetHandle === "right-target")
      ) {
        return;
      }

      if (
        (sourceNode.type === "question" && targetNode.type === "question") ||
        (sourceNode.type === "fact" && targetNode.type === "fact")
      ) {
        action.payload.type = "dependency";
        action.payload.data = { type: "full" };
        // action.payload.markerEnd = {
        //   type: MarkerType.Arrow,
        //   width: 20,
        //   height: 20,
        // };
      }
      state.edges = addEdge(action.payload, state.edges);
    },

    // QUESTIONAIRE REDUCERS

    updateConstraints: (state, action) => {
      state.constraints = action.payload;
    },
  },
});

export const {
  // Flow
  onNodesChange,
  onEdgesChange,
  onConnect,
  setEdges,
  updateDependencyEdgeType,
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
  updateConstraints,
} = flow.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.flow.value;

export const selectQuestions = (state) => state.flow.questions;
export const selectFacts = (state) => state.flow.facts;

export const selectNodes = createSelector(
  [selectQuestions, selectFacts],
  (questions, facts) => [...questions, ...facts]
);
export const selectEdges = (state) => state.flow.edges;

export const selectQuestion = (questionId) =>
  createSelector([selectQuestions], (questions) => {
    return questions.find((question) => question.id === questionId);
  });

export const selectFact = (factId) =>
  createSelector([selectFacts], (facts) => {
    return facts.find((fact) => fact.id === factId);
  });

export const selectConstraints = (state) => state.flow.constraints;

export default flow.reducer;
