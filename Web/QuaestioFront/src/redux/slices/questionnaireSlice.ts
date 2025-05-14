import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionnaireState, Question, Fact } from "@/types/common";

import {
  loadQuestionarie,
  openQuestionnaire,
  answerQuestion,
  rollbackQuestion,
  continueQuestionnaire,
  completeQuestionnaire,
} from "../thunks/questionnaireThunks";

// Used for API responses - add partial to handle potential data
interface QuestionnaireData extends Partial<QuestionnaireState> {
  name: string;
  author: string;
  reference: string;
  mandatoryFactsAnswered: boolean;
  facts: Record<string, Fact>;
  questions: Record<string, Question>;
}

const initialState: QuestionnaireState = {
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

const setInitialState = (state: QuestionnaireState): void => {
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

const replaceStateData = (
  state: QuestionnaireState,
  data: QuestionnaireData
): void => {
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

const setAnsweredFacts = (
  state: QuestionnaireState,
  question: Question
): void => {
  state.answeredFacts = question.facts.reduce<Record<string, boolean>>(
    (acc, fact) => {
      acc[fact] = state.facts[fact].value;
      return acc;
    },
    {}
  );
};

export const questionnaireSlice = createSlice({
  name: "questionnaire",
  initialState,
  reducers: {
    setSelectedQuestion: (state, action: PayloadAction<string>) => {
      state.selectedQuestion = action.payload;
      state.selectedFact = "";
      state.factInspectorOpen = false;
      setAnsweredFacts(state, state.questions[action.payload]);
    },
    setSelectedFact: (state, action: PayloadAction<string>) => {
      state.selectedFact = action.payload;
    },
    toggleAnsweredFact: (state, action: PayloadAction<string>) => {
      state.answeredFacts[action.payload] =
        !state.answeredFacts[action.payload];
    },
    setFactInspectorOpen: (state, action: PayloadAction<boolean>) => {
      state.factInspectorOpen = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(openQuestionnaire.fulfilled, (state, action) => {
      setInitialState(state);
      replaceStateData(state, action.payload as QuestionnaireData);
    });

    builder.addCase(loadQuestionarie.fulfilled, (state, action) => {
      replaceStateData(state, action.payload as QuestionnaireData);
    });

    builder.addCase(answerQuestion.fulfilled, (state, action) => {
      replaceStateData(state, action.payload as QuestionnaireData);
    });

    builder.addCase(rollbackQuestion.fulfilled, (state, action) => {
      replaceStateData(state, action.payload as QuestionnaireData);
    });

    builder.addCase(continueQuestionnaire.fulfilled, () => {});

    builder.addCase(completeQuestionnaire.fulfilled, (state, action) => {
      replaceStateData(state, action.payload as QuestionnaireData);
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
