import { useMemo } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

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
    <Card
      className={`${className} w-full min-w-[302px] md:w-[49%] md:h-[290px] lg:w-full lg:h-full lg:max-w-md overflow-scroll`}
    >
      <CardHeader
        className=""
        title={
          type === questionType.ANSWERED
            ? "Answered Questions"
            : "Valid Questions"
        }
      />
      <Divider />
      <CardContent>
        <List component="nav" aria-label="main mailbox folders">
          {displayedQuestions.map((question, index) => (
            <>
              {index !== 0 && <Divider />}
              <ListItemButton
                selected={selectedQuestion === question.id}
                key={question.id}
                onClick={(event) => handleListItemClick(event, question.id)}
              >
                <ListItemText primary={question.description} />
              </ListItemButton>
            </>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
