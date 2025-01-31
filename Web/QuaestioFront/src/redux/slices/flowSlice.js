import { createSelector, createSlice } from "@reduxjs/toolkit";
import { addEdge, applyNodeChanges, applyEdgeChanges } from "@xyflow/react";
const initialState = {
  questions: [],
  facts: [],
  edges: [],
};

export const flow = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setEdges: (state, action) => {
      state.edges = action.payload;
    },
    addEdge: (state, action) => {
      const newEdge = {
        ...action.payload,
        id: `E-${action.source}->${action.target}`,
      };
      state.edges = addEdge(newEdge, state.edges);
    },
    addQuestion: (state, action) => {
      const lastId = state.questions[state.questions.length - 1]?.id || "Q0";
      const newId = `Q${Number(lastId.replace("Q", "")) + 1}`;
      const newNode = { ...action.payload, id: newId, type: "question" };
      state.questions = [...state.questions, newNode];
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
      const a = applyNodeChanges(action.payload, state.questions);
      state.questions = a;
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

      if (sourceNode.type === "question" && targetNode.type === "question") {
        action.payload.type = "questionDependency";
      }
      state.edges = addEdge(action.payload, state.edges);
    },
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  onNodesChange,
  onEdgesChange,
  onConnect,
  updateNodeColor,
  updateNodeText,
  setEdges,
  setNodes,
  addQuestion,
  addFact,
  updateNodeProperties,
} = flow.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.flow.value;

export const selectQuestions = (state) => state.flow.questions;
export const selectFacts = (state) => state.flow.facts;

export const selectNodes = createSelector(
  selectQuestions,
  selectFacts,
  (questions, facts) => [...questions, ...facts]
);
export const selectEdges = (state) => state.flow.edges;

export default flow.reducer;
