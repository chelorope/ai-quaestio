import { useMemo } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import {
  answerQuestion,
  rollbackQuestion,
} from "@/redux/thunks/questionnaireThunks";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function QuestionButton({ sx }) {
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
      Object.values(answeredFacts).reduce(
        (accum, factValue) => accum || factValue,
        false
      ),
    [answeredFacts]
  );
  const isQuestionAnswered = useMemo(
    () => !!questions[selectedQuestion]?.answered,
    [questions, selectedQuestion]
  );

  const handleAnswer = () => {
    dispatch(
      answerQuestion({
        questionId: selectedQuestion,
        answeredFacts: Object.keys(answeredFacts).map((key) => ({
          id: key,
          value:
            answeredFacts[key] || (!areFactsAnswered && facts[key].default),
        })),
      })
    );
  };
  const handleRollback = () => {
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
