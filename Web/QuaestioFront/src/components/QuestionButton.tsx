import { useMemo } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  answerQuestion,
  rollbackQuestion,
} from "@/redux/thunks/questionnaireThunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { ComponentWithSxProps, AnsweredFacts } from "@/types/common";

// The interface should match what the answerQuestion thunk expects
interface AnswerQuestionRequest {
  questionId: string;
  answeredFacts: Array<{
    id: string;
    value: boolean;
  }>;
}

export default function QuestionButton({
  sx,
}: ComponentWithSxProps): JSX.Element {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questionnaire.questions);
  const facts = useAppSelector((state) => state.questionnaire.facts);
  const selectedQuestion = useAppSelector(
    (state) => state.questionnaire.selectedQuestion
  );
  const answeredFacts = useAppSelector(
    (state) => state.questionnaire.answeredFacts
  );

  const areFactsAnswered = useMemo(
    () =>
      Object.values(answeredFacts as AnsweredFacts).reduce(
        (accum, factValue) => accum || factValue,
        false
      ),
    [answeredFacts]
  );

  const isQuestionAnswered = useMemo(
    () => !!questions[selectedQuestion]?.answered,
    [questions, selectedQuestion]
  );

  const handleAnswer = (): void => {
    const factIds = Object.keys(answeredFacts);

    const data: AnswerQuestionRequest = {
      questionId: selectedQuestion,
      answeredFacts: factIds.map((key) => ({
        id: key,
        // Ensure value is always boolean, defaults to false if undefined
        value:
          !!answeredFacts[key] || (!areFactsAnswered && !!facts[key].default),
      })),
    };

    dispatch(answerQuestion(data));
  };

  const handleRollback = (): void => {
    dispatch(rollbackQuestion(selectedQuestion));
  };

  const displayText = useMemo(() => {
    if (!areFactsAnswered && !isQuestionAnswered) {
      return "Default Answer";
    } else if (!isQuestionAnswered) {
      return "Answer";
    } else if (isQuestionAnswered) {
      return "Rollback";
    }
    return "";
  }, [areFactsAnswered, isQuestionAnswered]);

  return (
    <Button
      sx={sx}
      variant="contained"
      color={isQuestionAnswered ? "error" : "primary"}
      disabled={!selectedQuestion}
      onClick={isQuestionAnswered ? handleRollback : handleAnswer}
    >
      <Typography>{displayText}</Typography>
    </Button>
  );
}
