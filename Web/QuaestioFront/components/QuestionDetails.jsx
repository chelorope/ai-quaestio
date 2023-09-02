import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

export default function QuestionsList({ className }) {
  const questions = useSelector((state) => state.questionaire.questions);

  const selectedQuestion = useSelector(
    (state) => state.questionaire.selectedQuestion
  );
  console.log(
    questions,
    selectedQuestion,
    questions[selectedQuestion],
    questions[selectedQuestion]?.guidelines
  );
  return (
    questions[selectedQuestion]?.guidelines && (
      <Paper className={`${className} w-full p-4`}>
        {questions[selectedQuestion]?.guidelines}
      </Paper>
    )
  );
}
