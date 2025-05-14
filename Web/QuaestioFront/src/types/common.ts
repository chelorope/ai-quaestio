import { SxProps, Theme } from "@mui/material/styles";

// Common Props
export interface CommonProps {
  sx?: SxProps<Theme>;
}

// Question Types based on questionnaireSlice
export interface Question {
  id: string;
  description: string;
  facts: string[];
  answered?: boolean;
  guidelines?: string;
}

export interface Fact {
  value: boolean;
  description: string;
  default?: boolean;
  mandatory?: boolean;
  id?: string;
}

export type QuestionType = "answered" | "valid";

// MUI component props with SX
export interface ComponentWithSxProps {
  sx?: SxProps<Theme>;
}

// State interfaces for Redux
export interface AnsweredFacts {
  [key: string]: boolean;
}

// Question List Props
export interface QuestionListProps {
  type: QuestionType;
  sx?: SxProps<Theme>;
}

// Questionnaire State from Redux
export interface QuestionnaireState {
  name: string;
  author: string;
  reference: string;
  questions: Record<string, Question>;
  selectedQuestion: string;
  facts: Record<string, Fact>;
  selectedFact: string;
  answeredFacts: Record<string, boolean>;
  mandatoryFactsAnswered: boolean;
  factInspectorOpen: boolean;
}
