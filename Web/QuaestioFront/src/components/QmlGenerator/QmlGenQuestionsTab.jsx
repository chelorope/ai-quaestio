import { Box, Paper } from "@mui/material";
import QmlGenQuestions from "./QmlGenQuestions";
import TabsView from "./TabsView";
import QmlGenQuestionDetails from "./QmlGenQuestionDetails";
import { useDispatch, useSelector } from "react-redux";
import QmlGenQuestionFacts from "./QmlGenQuestionFacts";
import QmlGenQuestionDependency from "./QmlGenQuestionDependency";
import {
  selectQuestion,
  setSelectedQuestion,
} from "@/redux/slices/qmlGeneratorSlice";
import { useEffect } from "react";

export default function QuestionsTab() {
  const dispatch = useDispatch();
  const selectedQuestionId = useSelector(
    (state) => state.qmlGenerator.selectedQuestion
  );
  const selectedQuestion = useSelector((state) =>
    selectQuestion(state, selectedQuestionId)
  );

  useEffect(() => {
    if (selectedQuestionId === undefined) {
      dispatch(setSelectedQuestion(0));
    }
  }, [dispatch, selectedQuestionId]);
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}
    >
      <Paper
        sx={{
          p: 5,
          width: 1,
          minWidth: 0.5,
          mr: { md: 2 },
          mb: { xs: 2, md: 0 },
        }}
      >
        <QmlGenQuestions />
      </Paper>
      <Paper sx={{ width: 1, minWidth: 0.5 }}>
        <TabsView
          type="buttons"
          tabs={[
            {
              label: "Details",
              content: selectedQuestionId !== undefined && (
                <QmlGenQuestionDetails
                  questionId={selectedQuestionId}
                  guidelines={selectedQuestion?.guidelines}
                />
              ),
            },
            {
              label: "Facts",
              content: <QmlGenQuestionFacts questionId={selectedQuestionId} />,
            },
            {
              label: "Fully Depends",
              content: (
                <QmlGenQuestionDependency
                  questionId={selectedQuestionId}
                  type="fully"
                />
              ),
            },
            {
              label: "Partially Depends",
              content: (
                <QmlGenQuestionDependency
                  questionId={selectedQuestionId}
                  type="partially"
                />
              ),
            },
          ]}
        />
      </Paper>
    </Box>
  );
}
