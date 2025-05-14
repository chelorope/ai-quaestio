import { useMemo, Fragment, useCallback } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ExportButton from "@/components/ExportButton";
import { Typography } from "@mui/material";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSelectedQuestion } from "@/redux/slices/questionnaireSlice";
import { QuestionListProps } from "@/types/common";

// Define internal types that match the store structure
interface QuestionItem {
  id: string;
  description: string;
  facts: string[];
  answered?: boolean;
}

const questionType = {
  ANSWERED: "answered" as const,
  VALID: "valid" as const,
};

export default function QuestionsList({
  type,
  sx,
}: QuestionListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questionnaire.questions);

  // Add ID to each question for proper tracking and handle type conversion
  const questionsWithIds = useMemo(() => {
    return Object.entries(questions).map(([id, question]) => ({
      ...question,
      id,
      // Handle the case where answered might not be present in the Redux store
      answered: "answered" in question ? question.answered : false,
    })) as QuestionItem[];
  }, [questions]);

  const displayedQuestions = useMemo(
    () =>
      questionsWithIds.filter((question) => {
        if (type === questionType.ANSWERED && question.answered) {
          return true;
        } else if (type === questionType.VALID && !question.answered) {
          return true;
        }
        return false;
      }),
    [questionsWithIds, type]
  );

  const selectedQuestion = useAppSelector(
    (state) => state.questionnaire.selectedQuestion
  );

  const handleListItemClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement>, questionId: string): void => {
      if (questionId) {
        dispatch(setSelectedQuestion(questionId));
      }
    },
    [dispatch]
  );

  const getContent = useMemo(() => {
    if (Object.keys(questions).length === 0) {
      return <div></div>;
    } else if (type === questionType.VALID && displayedQuestions.length === 0) {
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
        <List component="nav" aria-label="question list">
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
  }, [
    type,
    displayedQuestions,
    selectedQuestion,
    questions,
    handleListItemClick,
  ]);

  return (
    <Card
      sx={{
        ...sx,
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
        {getContent}
      </CardContent>
    </Card>
  );
}
