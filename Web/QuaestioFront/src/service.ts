import axios, { AxiosInstance } from "axios";

const request: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5050",
  timeout: 5000,
  withCredentials: true,
});

// FormData for opening a questionnaire
export const loadQuestionarie = async () => request.get("/");

export const openQuestionnaire = async (formData: FormData) =>
  request.post("/open", formData);

export const continueQuestionnaire = async () => request.get("/continue");

export const completeQuestionnaire = async () => request.get("/complete");

export const exportQuestionnaire = async () =>
  request.get("/export", { responseType: "blob" });

interface AnswerQuestionRequest {
  questionId: string;
  answeredFacts: Array<{ id: string; value: boolean }>;
}

export const answerQuestion = async (body: AnswerQuestionRequest) =>
  request.post("/question/answer", body);

export const rollbackQuestion = async (questionId: string) =>
  request.post("/question/rollback", { questionId });
