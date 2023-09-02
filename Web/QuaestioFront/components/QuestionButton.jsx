import { useMemo } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useDispatch, useSelector } from "react-redux";
import {
  answerQuestion,
  rollbackQuestion,
} from "@/src/redux/questionaireThunks";

export default function FactList() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionaire.questions);
  const facts = useSelector((state) => state.questionaire.facts);
  const selectedQuestion = useSelector(
    (state) => state.questionaire.selectedQuestion
  );
  const answeredFacts = useSelector(
    (state) => state.questionaire.answeredFacts
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
      variant="contained"
      color={isQuestionAnswered ? "error" : "primary"}
      disabled={!selectedQuestion}
      onClick={isQuestionAnswered ? handleRollback : handleAnswer}
    >
      <Typography>{displayText}</Typography>
    </Button>
  );
}
