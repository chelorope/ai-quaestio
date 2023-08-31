import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

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
  async (body) => {
    const response = await request.post("/answer-question", body);
    return response.data;
  }
);

export const rollbackQuestion = createAsyncThunk(
  "questionaire/rollbackQuestion",
  async (questionId) => {
    const response = await request.post("/rollback-question", { questionId });
    return response.data;
  }
);
