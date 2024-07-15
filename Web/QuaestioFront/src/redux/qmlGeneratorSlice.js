import { createSlice } from "@reduxjs/toolkit";
import { exportQMLFile } from "./qmlGeneratorThunks";

const initialQuestion = {
  description: "",
  guidelines: "",
  fullyDepends: {},
  partiallyDepends: {},
  facts: {},
};

const initialFact = {
  description: "",
  guidelines: "",
  fullyDepends: {},
  partiallyDepends: {},
  mandatory: false,
  default: false,
};

const initialState = {
  questions: [
    {
      description: "The description of q1",
      guidelines: "The guidelines of q1",
      fullyDepends: {},
      partiallyDepends: {},
      facts: { 0: true, 5: true },
    },
    {
      description: "The description of q2",
      guidelines: "The guidelines of q2",
      fullyDepends: { 0: true },
      partiallyDepends: { 1: true },
      facts: {},
    },
  ],
  facts: [
    {
      description: "The description of f1",
      guidelines: "The guidelines of f1",
      mandatory: true,
      default: true,
      fullyDepends: {},
      partiallyDepends: {},
    },
    {
      description: "The description of f2",
      guidelines: "The guidelines of f2",
      mandatory: false,
      default: false,
      fullyDepends: {},
      partiallyDepends: {},
    },
    {
      description: "The description of f3",
      guidelines: "The guidelines of f3",
      fullyDepends: { 0: true },
      partiallyDepends: {},
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
    updateQuestionFacts: (state, action) => {
      state.questions[action.payload.index].facts[action.payload.value] =
        !state.questions[action.payload.index].facts[action.payload.value];
    },
    updateQuestionGuidelines: (state, action) => {
      state.questions[action.payload.index].guidelines = action.payload.value;
    },
    updateQuestionDependency: (state, action) => {
      if (action.payload.type === "fully") {
        state.questions[action.payload.index].fullyDepends[
          action.payload.value
        ] =
          !state.questions[action.payload.index].fullyDepends[
            action.payload.value
          ];
      } else {
        state.questions[action.payload.index].partiallyDepends[
          action.payload.value
        ] =
          !state.questions[action.payload.index].partiallyDepends[
            action.payload.value
          ];
      }
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
    updateFactDependency: (state, action) => {
      if (action.payload.type === "fully") {
        state.facts[action.payload.index].fullyDepends[action.payload.value] =
          !state.facts[action.payload.index].fullyDepends[action.payload.value];
      } else {
        state.facts[action.payload.index].partiallyDepends[
          action.payload.value
        ] =
          !state.facts[action.payload.index].partiallyDepends[
            action.payload.value
          ];
      }
    },
    removeFact: (state, action) => {
      state.facts.splice(action.payload, 1);
    },
    setSelectedFact: (state, action) => {
      state.selectedFact = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(exportQMLFile.fulfilled, exportQMLFile);
  },
});

// Action creators are generated for each case reducer function
export const {
  //Questions
  addQuestion,
  updateQuestionDescription,
  updateQuestionFacts,
  updateQuestionGuidelines,
  updateQuestionDependency,
  removeQuestion,
  setSelectedQuestion,

  // Facts
  addFact,
  updateFactDescription,
  updateFactGuidelines,
  updateFactMandatory,
  updateFactDefault,
  updateFactDependency,
  removeFact,
  setSelectedFact,
} = qmlGeneratorSlice.actions;

export default qmlGeneratorSlice.reducer;
