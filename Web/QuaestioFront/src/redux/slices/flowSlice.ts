import { createSelector, createSlice } from "@reduxjs/toolkit";
import {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
} from "@xyflow/react";
import type { PayloadAction } from "@reduxjs/toolkit";

interface FlowState {
  questions: Node[];
  facts: Node[];
  edges: Edge[];
}

const initialState: FlowState = {
  questions: [],
  facts: [],
  edges: [],
};

interface AddEdgePayload {
  source: string;
  target: string;
}

export type QuestionNode = Node<
  {
    title: string;
    description: string;
  },
  "question"
>;

// const getInitialQuestion = ({ id, ...flowProps }: Node): Node => ({
//   id,
//   ...flowProps,
// });

export const flow = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    addEdge: (state, action: PayloadAction<AddEdgePayload>) => {
      const newEdge = {
        ...action.payload,
        id: `E-${action.payload.source}->${action.payload.target}`,
      };
      state.edges = addEdge(newEdge, state.edges);
    },
    addQuestion: (state, action) => {
      const lastId = state.questions[state.questions.length - 1]?.id || "Q0";
      const newId = `Q${Number(lastId.replace("Q", "")) + 1}`;
      const newNode = {
        ...action.payload,
        id: newId,
        type: "question",
        data: { title: "", guidelines: "" },
      };
      state.questions = [...state.questions, newNode];
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

    addFact: (state, action) => {
      console.log("addFact", action.payload);
      const lastId = state.facts[state.facts.length - 1]?.id || "F0";
      const newId = `F${Number(lastId.replace("F", "")) + 1}`;
      const newNode = { ...action.payload, id: newId, type: "fact" };
      state.facts = [...state.facts, newNode];

      const factEdge = {
        sourceHandle: "right-source",
        source: action.payload.parentId,
        targetHandle: "left-target",
        target: newId,
        animated: true,
      };
      state.edges = addEdge(factEdge, state.edges);
    },
    // updateNodeProperties: (state, action) => {
    //   state.nodes = state.nodes.map((node) => {
    //     if (node.id === action.payload.id) {
    //       node.data = {
    //         ...node.data,
    //         //add rest of payload to to node data, through map? or ..action.payload.updatedProperties
    //         slashCommand: action.payload.slashCommand,
    //       };
    //     }
    //     return node;
    //   });
    // },

    //for practise:
    // updateNodeText: (state, action) => {
    //   state.nodes = state.nodes.map((node) => {
    //     if (node.id === action.payload.id) {
    //       node.data = { ...node.data, label: action.payload.text };
    //       console.log(action.payload);
    //     }
    //     return node;
    //   });
    // },
    // updateNodeColor: (state, action) => {
    //   state.nodes = state.nodes.map((node) => {
    //     if (node.id === action.payload.id) {
    //       action.payload.color;
    //       node.data = { ...node.data, color: action.payload.color };
    //     }
    //     return node;
    //   });
    // },

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
          targetNode.type === "question" &&
          action.payload.sourceHandle === "right-source")
      ) {
        return;
      }

      if (
        (sourceNode.type === "question" && targetNode.type === "question") ||
        (sourceNode.type === "fact" && targetNode.type === "fact")
      ) {
        action.payload.type = "questionDependency";
      }
      state.edges = addEdge(action.payload, state.edges);
    },
  },
});

export const {
  onNodesChange,
  onEdgesChange,
  onConnect,
  setEdges,
  // setNodes,
  addQuestion,
  updateQuestionTitle,
  updateQuestionGuidelines,
  addFact,
  // updateNodeProperties,
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

export default flow.reducer;
