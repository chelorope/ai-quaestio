import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  questions: [
    {
      description: "The description?",
      guidelines: "The guidelines",
      fullyDepends: [],
      partiallyDepends: [],
      facts: ["f1", "f2"],
    },
    {
      description: "The description?",
      guidelines: "The guidelines",
      fullyDepends: ["11"],
      partiallyDepends: ["f2"],
    },
  ],
  facts: [
    {
      description: "The description of f1",
      guidelines: "The guidelines of f1",
      mandatory: "true",
      default: "true",
    },
    {
      description: "The description of f2",
      guidelines: "The guidelines of f2",
      mandatory: "false",
      default: "false",
    },
    {
      description: "The description of f3",
      guidelines: "The guidelines of f3",
      fullyDepends: ["f1"],
      mandatory: "true",
      default: "false",
    },
  ],
  conditions: {},
};

export const qmlGeneratorSlice = createSlice({
  name: "qmlGenerator",
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push("");
    },
    updateQuestion: (state, action) => {
      state.questions[action.payload.index] = action.payload.question;
    },
    removeQuestion: (state, action) => {
      state.questions.splice(action.payload, 1);
    },
    addFact: (state, action) => {
      state.facts.push("");
    },
    updateFact: (state, action) => {
      state.facts[action.payload.index] = action.payload.fact;
    },
    removeFact: (state, action) => {
      state.facts.splice(action.payload, 1);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  selectQuestion,
  selectFact,
  toggleAnsweredFact,
  setFactInspectorOpen,
} = qmlGeneratorSlice.actions;

export default qmlGeneratorSlice.reducer;
