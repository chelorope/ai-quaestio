import { createSelector, createSlice } from "@reduxjs/toolkit";
import { isBrowser } from "../../utils";

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

const persistedState = isBrowser() && localStorage.getItem("qmlGenerator");

export const getInitialState = () =>
  JSON.parse(
    persistedState
      ? persistedState
      : JSON.stringify({
          questions: [{ ...initialQuestion }],
          facts: [{ ...initialFact }],
          constraints: "",
          selectedQuestion: undefined,
          selectedFact: undefined,
          fileDetails: {
            name: "",
            reference: "",
            author: "",
          },
        })
  );

export const qmlGeneratorSlice = createSlice({
  name: "qmlGenerator",
  initialState: getInitialState(),
  reducers: {
    // Load from file
    setState: (state, action) => {
      return action.payload;
    },
    resetState: () => {
      return getInitialState();
    },

    // Questions
    addQuestion: (state) => {
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
      state.selectedQuestion = state.questions[0] ? 0 : undefined;
      state.questions.forEach((question) => {
        delete question.fullyDepends[action.payload];
        delete question.partiallyDepends[action.payload];
      });
    },
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
    },

    // Facts
    addFact: (state) => {
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
      state.selectedFact = state.facts[0] ? 0 : undefined;
      state.facts.forEach((fact) => {
        delete fact.fullyDepends[action.payload];
        delete fact.partiallyDepends[action.payload];
      });
      state.questions.forEach((question) => {
        delete question.facts[action.payload];
      });
    },
    setSelectedFact: (state, action) => {
      state.selectedFact = action.payload;
    },

    // File details
    updateFileDetails: (state, action) => {
      state.fileDetails = { ...state.fileDetails, ...action.payload };
    },

    // Constraints
    updateConstraints: (state, action) => {
      state.constraints = action.payload;
    },
    insertConstraints: (state, action) => {
      state.constraints = action.payload;
    },
  },
});

// Selectors
const selectSelectedQuestion = (state) => state.qmlGenerator.selectedQuestion;

export const selectFacts = createSelector(
  [(state) => state.qmlGenerator.facts],
  (facts) => facts.map((fact, index) => ({ ...fact, id: index }))
);
export const selectQuestions = createSelector(
  [(state) => state.qmlGenerator.questions],
  (questions) => {
    return questions.map((question, index) => ({ ...question, id: index }));
  }
);

export const selectFact = createSelector(
  [selectFacts, (_, factId) => factId],
  (facts, factId) => facts[factId]
);

export const selectQuestion = createSelector(
  [selectQuestions, (_, questionId) => questionId],
  (questions, questionId) => questions[questionId]
);

export const selectSelectedQuestionObject = createSelector(
  [selectQuestions, selectSelectedQuestion],
  (questions, selectedQuestion) => questions[selectedQuestion]
);

export const selectFactDescriptions = createSelector([selectFacts], (facts) =>
  facts.map((fact) => fact.description)
);

export const selectQuestionDescriptions = createSelector(
  [selectQuestions],
  (questions) => questions.map((question) => question.description)
);

export const selectRestFacts = createSelector(
  [selectFacts, (_, factId) => factId],
  (facts, factId) => facts.filter((_, index) => index !== factId)
);

export const selectRestQuestions = createSelector(
  [selectQuestions, (_, questionId) => questionId],
  (questions, questionId) =>
    questions.filter((_, index) => index !== questionId)
);

export const selectFactDependencies = createSelector(
  [selectFacts, (_, factId) => factId, (_, type) => type],
  (facts, factId, type) =>
    type === "partially"
      ? facts[factId]?.partiallyDepends
      : facts[factId]?.fullyDepends
);

export const selectQuestionDependencies = createSelector(
  [selectQuestions, (_, questionId) => questionId, (_, type) => type],
  (questions, questionId, type) =>
    type === "partially"
      ? questions[questionId]?.partiallyDepends
      : questions[questionId]?.fullyDepends
);

// Action creators are generated for each case reducer function
export const {
  setState,
  resetState,

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

  // File details
  updateFileDetails,

  // Constraints
  updateConstraints,
  insertConstraints,
} = qmlGeneratorSlice.actions;
export const actions = Object.values(qmlGeneratorSlice.actions);

export default qmlGeneratorSlice.reducer;
