import { createAsyncThunk } from "@reduxjs/toolkit";
import { openModal } from "../slices/modalSlice";
import * as Service from "@/service";
import { RootState } from "../store";
import { dclToXmi } from "@/utils/xmlUtils";

interface AnswerQuestionRequest {
  questionId: string;
  answeredFacts: Array<{ id: string; value: boolean }>;
}

interface Question {
  answered?: boolean;
}

interface QuestionnaireResponse {
  data: {
    questions: Record<string, Question>;
    mandatoryFactsAnswered: boolean;
  };
}

export const openQuestionnaire = createAsyncThunk(
  "questionnaire/openQuestionnaire",
  async (formData: FormData) => {
    let response = { data: {} };
    try {
      response = await Service.openQuestionnaire(formData);
    } catch (error) {
      console.error("ERROR", error);
    }
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
      const state = getState() as RootState;

      const buffer = await response.data.arrayBuffer();
      const decoder = new TextDecoder("utf-8");
      const xmiString = dclToXmi(decoder.decode(buffer));
      const xmiBlob = new Blob([xmiString], { type: "application/xml" });

      for (const blob of [xmiBlob, response.data]) {
        const aElement = document.createElement("a");
        aElement.setAttribute(
          "download",
          `${state.questionnaire.name}.${blob === xmiBlob ? "xmi" : "dcl"}`
        );
        const href = URL.createObjectURL(blob);
        aElement.href = href;
        aElement.setAttribute("target", "_blank");
        aElement.click();
        URL.revokeObjectURL(href);
      }
    } catch (error) {
      console.error("ERROR", error);
    }
  }
);

export const answerQuestion = createAsyncThunk(
  "questionnaire/answerQuestion",
  async (body: AnswerQuestionRequest, { dispatch }) => {
    const response = (await Service.answerQuestion(
      body
    )) as QuestionnaireResponse;
    const data = response.data;
    const areAllAnswered = Object.values(data.questions).every(
      (q) => q.answered === true
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
  async (questionId: string) => {
    const response = await Service.rollbackQuestion(questionId);
    return response.data;
  }
);
