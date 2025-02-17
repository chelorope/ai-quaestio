import { createSlice } from "@reduxjs/toolkit";

import {
  loadQuestionarie,
  openQuestionnaire,
  answerQuestion,
  rollbackQuestion,
  continueQuestionnaire,
  completeQuestionnaire,
} from "../thunks/questionnaireThunks";

interface QuestionaireState {
  name: string;
  author: string;
  reference: string;
  questions: Record<string, Question>;
  selectedQuestion: string;
  facts: Record<string, Fact>;
  selectedFact: string;
  answeredFacts: Record<string, boolean>;
  mandatoryFactsAnswered: boolean;
  factInspectorOpen: boolean;
}

interface Question {
  description: string;
  facts: string[];
}

interface Fact {
  value: boolean;
  description: string;
}

const initialState: QuestionaireState = {
  name: "",
  author: "",
  reference: "",
  questions: {},
  selectedQuestion: "",
  facts: {},
  selectedFact: "",
  answeredFacts: {},
  mandatoryFactsAnswered: false,
  factInspectorOpen: false,
};

const setInitialState = (state: QuestionaireState) => {
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

const replaceStateData = (state: QuestionaireState, data) => {
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

const setAnsweredFacts = (state: QuestionaireState, question) => {
  state.answeredFacts = question.facts.reduce((acc, fact) => {
    acc[fact] = state.facts[fact].value;
    return acc;
  }, {});
};

export const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    setSelectedQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
      state.selectedFact = "";
      state.factInspectorOpen = false;
      setAnsweredFacts(state, state.questions[action.payload]);
    },
    setSelectedFact: (state, action) => {
      state.selectedFact = action.payload;
    },
    toggleAnsweredFact: (state, action) => {
      state.answeredFacts[action.payload] =
        !state.answeredFacts[action.payload];
    },
    setFactInspectorOpen: (state, action) => {
      state.factInspectorOpen = action.payload;
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

    builder.addCase(continueQuestionnaire.fulfilled, () => {});

    builder.addCase(completeQuestionnaire.fulfilled, (state, action) => {
      replaceStateData(state, action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedQuestion,
  setSelectedFact,
  toggleAnsweredFact,
  setFactInspectorOpen,
} = questionnaireSlice.actions;

export default questionnaireSlice.reducer;
