import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:5050",
  timeout: 1000,
  withCredentials: true,
});

export const loadQuestionarie = async () => request.get("/");

export const openQuestionnaire = async (formData) =>
  request.post("/open", formData);

export const continueQuestionnaire = async () => request.get("/continue");

export const completeQuestionnaire = async () => request.get("/complete");

export const exportQuestionnaire = async () =>
  request.get("/export", { responseType: "blob" });

export const answerQuestion = async (body) =>
  request.post("/question/answer", body);

export const rollbackQuestion = async (questionId) =>
  request.post("/question/rollback", { questionId });
