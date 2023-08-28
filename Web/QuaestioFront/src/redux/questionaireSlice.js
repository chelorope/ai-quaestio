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
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
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
export const { increment } = questionaireSlice.actions;

export default questionaireSlice.reducer;
