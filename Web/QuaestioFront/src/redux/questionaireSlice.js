import { createSlice } from "@reduxjs/toolkit";

import {
  loadQuestionarie,
  openQuestionaire,
  answerQuestion,
  rollbackQuestion,
  continueQuestionaire,
} from "./questionaireThunks";

const initialState = {
  name: "",
  author: "",
  reference: "",
  questions: {},
  validQuestions: [],
  answeredQuestions: [],
  selectedQuestion: "",
  facts: {},
  selectedFact: "",
  answeredFacts: {},
  mandatoryFactsAnswered: false,
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

export const questionaireSlice = createSlice({
  name: "questionaire",
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
    builder.addCase(openQuestionaire.fulfilled, (state, action) => {
      state = { ...initialState };
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

    builder.addCase(continueQuestionaire.fulfilled, (state, action) => {});
  },
});

// Action creators are generated for each case reducer function
export const { selectQuestion, selectFact, toggleAnsweredFact } =
  questionaireSlice.actions;

export default questionaireSlice.reducer;
