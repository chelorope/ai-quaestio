import { createSlice } from "@reduxjs/toolkit";

const initialQuestion = {
  description: "",
  guidelines: "",
  fullyDepends: [],
  partiallyDepends: [],
  facts: [],
};

const initialFact = {
  description: "",
  guidelines: "",
  fullyDepends: [],
  mandatory: false,
  default: false,
};

const initialState = {
  questions: [
    {
      description: "The description of q1",
      guidelines: "The guidelines of q1",
      fullyDepends: [],
      partiallyDepends: [],
      facts: [0, 1],
    },
    {
      description: "The description of q2",
      guidelines: "The guidelines of q2",
      fullyDepends: [0],
      partiallyDepends: [1],
    },
  ],
  facts: [
    {
      description: "The description of f1",
      guidelines: "The guidelines of f1",
      mandatory: true,
      default: true,
    },
    {
      description: "The description of f2",
      guidelines: "The guidelines of f2",
      mandatory: false,
      default: false,
    },
    {
      description: "The description of f3",
      guidelines: "The guidelines of f3",
      fullyDepends: [0],
      mandatory: true,
      default: false,
    },
  ],
  conditions: {},
  selectedQuestion: 0,
  selectedFact: 0,
};

export const qmlGeneratorSlice = createSlice({
  name: "qmlGenerator",
  initialState,
  reducers: {
    // Questions
    addQuestion: (state, action) => {
      state.questions.push({ ...initialQuestion });
    },
    updateQuestionDescription: (state, action) => {
      state.questions[action.payload.index].description = action.payload.value;
    },
    updateQuestionGuidelines: (state, action) => {
      state.questions[action.payload.index].guidelines = action.payload.value;
    },
    removeQuestion: (state, action) => {
      state.questions.splice(action.payload, 1);
    },
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },

    // Facts
    addFact: (state, action) => {
      state.facts.push({ ...initialFact });
    },
    updateFactDescription: (state, action) => {
      state.facts[action.payload.index].description = action.payload.value;
    },
    updateFactGuidelines: (state, action) => {
      state.facts[action.payload.index].guidelines = action.payload.value;
    },
    updateFactMandatory: (state, action) => {
      state.facts[action.payload.index].mandatory = action.payload.value;
    },
    updateFactDefault: (state, action) => {
      state.facts[action.payload.index].default = action.payload.value;
    },
    removeFact: (state, action) => {
      state.facts.splice(action.payload, 1);
    },
    setSelectedFact: (state, action) => {
      state.selectedFact = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  //Questions
  addQuestion,
  updateQuestionDescription,
  updateQuestionGuidelines,
  removeQuestion,
  setSelectedQuestion,

  // Facts
  addFact,
  updateFactDescription,
  updateFactGuidelines,
  updateFactMandatory,
  updateFactDefault,
  removeFact,
  setSelectedFact,
} = qmlGeneratorSlice.actions;

export default qmlGeneratorSlice.reducer;
