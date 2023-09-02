import { useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useDispatch, useSelector } from "react-redux";
import { selectQuestion } from "@/src/redux/questionaireSlice";

const questionType = {
  ANSWERED: "answered",
  VALID: "valid",
};

export default function QuestionsList({ type, className }) {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionaire.questions);
  const displayedQuestions = useMemo(() =>
    Object.values(questions).filter(
      (question) => {
        if (type === questionType.ANSWERED && question.answered) {
          return question;
        } else if (type === questionType.VALID && !question.answered) {
          return question;
        }
      },
      [questions, type]
    )
  );
  const selectedQuestion = useSelector(
    (state) => state.questionaire.selectedQuestion
  );

  const handleListItemClick = (event, questionId) => {
    dispatch(selectQuestion(questionId));
  };

  return (
    <Paper
      className={`${className} w-full min-w-[302px] md:w-[49%] md:h-[290px] lg:h-full lg:max-w-sm overflow-scroll`}
      elevation={10}
    >
      <List component="nav" aria-label="main mailbox folders">
        {displayedQuestions.map((question) => (
          <ListItemButton
            selected={selectedQuestion === question.id}
            key={question.id}
            onClick={(event) => handleListItemClick(event, question.id)}
          >
            <ListItemText primary={question.description} />
          </ListItemButton>
        ))}
      </List>
    </Paper>
  );
}
