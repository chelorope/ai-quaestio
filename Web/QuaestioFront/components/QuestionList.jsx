import { useMemo } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ExportButton from "@/components/ExportButton";

import { useDispatch, useSelector } from "react-redux";
import { selectQuestion } from "@/src/redux/questionaireSlice";
import { Typography } from "@mui/material";

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

  const getContent = useMemo(
    () => () => {
      if (type === questionType.VALID && displayedQuestions.length === 0) {
        return (
          <div className="w-full h-full flex flex-col justify-center items-center">
            <Typography variant="h6" align="center" className="mb-5">
              All questions have been answered
            </Typography>
            <ExportButton />
          </div>
        );
      } else {
        return (
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
        );
      }
    },
    [type, displayedQuestions]
  );

  return (
    <Card
      className={`${className} w-full min-w-[302px] md:w-[49%] md:h-[290px] lg:w-full lg:h-full lg:max-w-md`}
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
      <CardContent className="h-[93%] overflow-scroll py-0">
        {getContent()}
      </CardContent>
    </Card>
  );
}
