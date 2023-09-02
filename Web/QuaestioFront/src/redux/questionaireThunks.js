import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { openModal } from "./modalSlice";

const request = axios.create({
  baseURL: "http://localhost:5050",
  timeout: 1000,
  withCredentials: true,
});

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

export const answerQuestion = createAsyncThunk(
  "questionaire/answerQuestion",
  async (body, { dispatch }) => {
    const response = await request.post("/answer-question", body);
    const data = response.data;
    const areAllAnswered = Object.values(data.questions).every(
      (q) => q.answered
    );
    if (areAllAnswered) {
      dispatch(openModal("export"));
    } else if (data.mandatoryFactsAnswered) {
      dispatch(openModal("complete"));
    }
    return data;
  }
);

export const rollbackQuestion = createAsyncThunk(
  "questionaire/rollbackQuestion",
  async (questionId) => {
    const response = await request.post("/rollback-question", { questionId });
    return response.data;
  }
);

export const continueQuestionaire = createAsyncThunk(
  "questionaire/continueQuestionaire",
  async () => {
    const response = await request.get("/continue");
    return response.data;
  }
);

export const completeQuestionaire = createAsyncThunk(
  "questionaire/completeQuestionaire",
  async () => {
    const response = await request.get("/complete");
    dispatch(openModal("export"));
    return response.data;
  }
);

export const exportQuestionaire = createAsyncThunk(
  "questionaire/exportQuestionaire",
  async () => {
    const response = await request.get("/export");
    return response.data;
  }
);
