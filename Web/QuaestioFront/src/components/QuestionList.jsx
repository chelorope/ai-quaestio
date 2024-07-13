import { useMemo, Fragment } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ExportButton from "@/components/ExportButton";

import { useDispatch, useSelector } from "react-redux";
import { selectQuestion } from "@/redux/questionnaireSlice";
import { Typography } from "@mui/material";

const questionType = {
  ANSWERED: "answered",
  VALID: "valid",
};

export default function QuestionsList({ type, sx }) {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionnaire.questions);
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
    (state) => state.questionnaire.selectedQuestion
  );

  const handleListItemClick = (event, questionId) => {
    dispatch(selectQuestion(questionId));
  };

  const getContent = useMemo(
    () => () => {
      if (Object.keys(questions).length === 0) {
        return <div></div>;
      } else if (
        type === questionType.VALID &&
        displayedQuestions.length === 0
      ) {
        return (
          <Box
            sx={{
              width: 1,
              height: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
              All questions have been answered
            </Typography>
            <ExportButton />
          </Box>
        );
      } else {
        return (
          <List component="nav" aria-label="main mailbox folders">
            {displayedQuestions.map((question, index) => (
              <Fragment key={index}>
                {index !== 0 && <Divider />}
                <ListItemButton
                  selected={selectedQuestion === question.id}
                  key={question.id}
                  onClick={(event) => handleListItemClick(event, question.id)}
                >
                  <ListItemText primary={question.description} />
                </ListItemButton>
              </Fragment>
            ))}
          </List>
        );
      }
    },
    [type, displayedQuestions]
  );

  return (
    <Card
      sx={{
        ...sx,
        width: "100%",
        minWidth: "300px",
        width: { xs: 1, md: "49%", lg: "100%" },
        height: { md: "290px", lg: 1 },
        maxWidth: { lg: "md" },
      }}
    >
      <CardHeader
        title={
          type === questionType.ANSWERED
            ? "Answered Questions"
            : "Valid Questions"
        }
        titleTypographyProps={{ align: "center" }}
      />
      <Divider />
      <CardContent sx={{ height: "85%", overflow: "scroll", py: 0 }}>
        {getContent()}
      </CardContent>
    </Card>
  );
}
