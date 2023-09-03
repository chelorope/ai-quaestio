import { createSlice } from "@reduxjs/toolkit";

import {
  loadQuestionarie,
  openQuestionnaire,
  answerQuestion,
  rollbackQuestion,
  continueQuestionnaire,
  completeQuestionnaire,
} from "./questionnaireThunks";

const initialState = {
  name: "",
  author: "",
  reference: "",
  questions: {},
  selectedQuestion: "",
  facts: {},
  selectedFact: "",
  answeredFacts: {},
  mandatoryFactsAnswered: false,
};

const setInitialState = (state) => {
  state.name = initialState.name;
  state.author = initialState.author;
  state.reference = initialState.reference;
  state.questions = initialState.questions;
  state.selectedQuestion = initialState.selectedQuestion;
  state.facts = initialState.facts;
  state.selectedFact = initialState.selectedFact;
  state.answeredFacts = initialState.answeredFacts;
  state.mandatoryFactsAnswered = initialState.mandatoryFactsAnswered;
};

const replaceStateData = (state, data) => {
  const { name, author, reference, mandatoryFactsAnswered, facts, questions } =
    data;
  state.name = name;
  state.author = author;
  state.reference = reference;
  state.mandatoryFactsAnswered = mandatoryFactsAnswered;
  state.questions = questions;
  state.facts = facts;

  if (state.selectedQuestion) {
    setAnsweredFacts(state, state.questions[state.selectedQuestion]);
  }
};

const setAnsweredFacts = (state, question) => {
  state.answeredFacts = question.facts.reduce((acc, fact) => {
    acc[fact] = state.facts[fact].value;
    return acc;
  }, {});
};

export const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    selectQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
      setAnsweredFacts(state, state.questions[action.payload]);
    },
    selectFact: (state, action) => {
      state.selectedFact = action.payload;
    },
    toggleAnsweredFact: (state, action) => {
      state.answeredFacts[action.payload] =
        !state.answeredFacts[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(openQuestionnaire.fulfilled, (state, action) => {
      setInitialState(state);
      replaceStateData(state, action.payload);
    });

    builder.addCase(loadQuestionarie.fulfilled, (state, action) => {
      replaceStateData(state, action.payload);
    });

    builder.addCase(answerQuestion.fulfilled, (state, action) => {
      replaceStateData(state, action.payload);
    });

    builder.addCase(rollbackQuestion.fulfilled, (state, action) => {
      replaceStateData(state, action.payload);
    });

    builder.addCase(continueQuestionnaire.fulfilled, (state, action) => {});

    builder.addCase(completeQuestionnaire.fulfilled, (state, action) => {
      replaceStateData(state, action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { selectQuestion, selectFact, toggleAnsweredFact } =
  questionnaireSlice.actions;

export default questionnaireSlice.reducer;
