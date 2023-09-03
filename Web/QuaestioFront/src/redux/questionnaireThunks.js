import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { openModal } from "./modalSlice";
import * as Service from "@/src/service";

export const openQuestionnaire = createAsyncThunk(
  "questionnaire/openQuestionnaire",
  async (formData) => {
    const response = await Service.openQuestionnaire(formData);
    return response.data;
  }
);

export const loadQuestionarie = createAsyncThunk(
  "questionnaire/loadQuestionarie",
  async () => {
    const response = await Service.loadQuestionarie();
    return response.data;
  }
);

export const continueQuestionnaire = createAsyncThunk(
  "questionnaire/continueQuestionnaire",
  async () => {
    const response = await Service.continueQuestionnaire();
    return response.data;
  }
);

export const completeQuestionnaire = createAsyncThunk(
  "questionnaire/completeQuestionnaire",
  async (_, { dispatch }) => {
    const response = await Service.completeQuestionnaire();
    dispatch(openModal("export"));
    return response.data;
  }
);

export const exportQuestionnaire = createAsyncThunk(
  "questionnaire/exportQuestionnaire",
  async (_, { getState }) => {
    try {
      const response = await Service.exportQuestionnaire();

      const aElement = document.createElement("a");
      aElement.setAttribute("download", `${getState().questionnaire.name}.dcl`);
      const href = URL.createObjectURL(response.data);
      aElement.href = href;
      aElement.setAttribute("target", "_blank");
      aElement.click();
      URL.revokeObjectURL(href);
    } catch (error) {
      console.log("ERROR", error);
    }
  }
);

export const answerQuestion = createAsyncThunk(
  "questionnaire/answerQuestion",
  async (body, { dispatch }) => {
    const response = await Service.answerQuestion(body);
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
  "questionnaire/rollbackQuestion",
  async (questionId) => {
    const response = await Service.rollbackQuestion(questionId);
    return response.data;
  }
);
