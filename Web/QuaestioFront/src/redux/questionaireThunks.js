import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { openModal } from "./modalSlice";
import * as Service from "@/src/service";

export const openQuestionaire = createAsyncThunk(
  "questionaire/openQuestionaire",
  async (formData) => {
    const response = await Service.openQuestionaire(formData);
    return response.data;
  }
);

export const loadQuestionarie = createAsyncThunk(
  "questionaire/loadQuestionarie",
  async () => {
    const response = await Service.loadQuestionarie();
    return response.data;
  }
);

export const continueQuestionaire = createAsyncThunk(
  "questionaire/continueQuestionaire",
  async () => {
    const response = await Service.continueQuestionaire();
    return response.data;
  }
);

export const completeQuestionaire = createAsyncThunk(
  "questionaire/completeQuestionaire",
  async (_, { dispatch }) => {
    const response = await Service.completeQuestionaire();
    dispatch(openModal("export"));
    return response.data;
  }
);

export const exportQuestionaire = createAsyncThunk(
  "questionaire/exportQuestionaire",
  async (_, { getState }) => {
    try {
      const response = await Service.exportQuestionaire();

      const aElement = document.createElement("a");
      aElement.setAttribute("download", `${getState().questionaire.name}.dcl`);
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
  "questionaire/answerQuestion",
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
  "questionaire/rollbackQuestion",
  async (questionId) => {
    const response = await Service.rollbackQuestion(questionId);
    return response.data;
  }
);
