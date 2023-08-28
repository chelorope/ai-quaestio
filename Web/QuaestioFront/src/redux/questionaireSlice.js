import axios from "axios";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const request = axios.create({
  baseURL: "http://localhost:5050",
  timeout: 1000,
  withCredentials: true,
});

const initialState = {
  name: "",
  author: "",
  reference: "",
  validQuestions: [],
  answeredQuestions: [],
  selectedQuestion: {},
  selectedFact: {},
  answeredFacts: {},
};

export const openQuestionaire = createAsyncThunk(
  "questionaire/openQuestionaire",
  async (formData) => {
    const response = await request.post("/open-questionaire", formData);
    return response.data;
  }
);

export const loadQuestionarie = createAsyncThunk(
  "questionaire/loadQuestionarie",
  async () => {
    const response = await request.get("/questionaire");
    return response.data;
  }
);

const replaceStateData = (state, data) => {
  const { name, author, reference, validQuestions, answeredQuestions } = data;
  state.name = name;
  state.author = author;
  state.reference = reference;
  state.validQuestions = validQuestions;
  state.answeredQuestions = answeredQuestions;
};

export const questionaireSlice = createSlice({
  name: "questionaire",
  initialState,
  reducers: {
    selectQuestion: (state, action) => {
      state.selectedQuestion = action.payload;
      state.answeredFacts = action.payload.facts.reduce((acc, fact) => {
        acc[fact.id] = false;
        return acc;
      }, {});
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
      replaceStateData(state, action.payload);
    });

    builder.addCase(loadQuestionarie.fulfilled, (state, action) => {
      replaceStateData(state, action.payload);
    });
  },
});

// Action creators are generated for each case reducer function
export const { selectQuestion, selectFact, toggleAnsweredFact } =
  questionaireSlice.actions;

export default questionaireSlice.reducer;
