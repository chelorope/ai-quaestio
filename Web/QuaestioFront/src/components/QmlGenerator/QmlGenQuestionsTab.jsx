import { Box, Paper } from "@mui/material";
import QmlGenQuestions from "./QmlGenQuestions";
import TabsView from "./TabsView";
import QmlGenQuestionDetails from "./QmlGenQuestionDetails";
import { useSelector } from "react-redux";
import QmlGenQuestionFacts from "./QmlGenQuestionFacts";
import QmlGenQuestionDependency from "./QmlGenQuestionDependency";

export default function QuestionsTab() {
  const selectedQuestionId = useSelector(
    (state) => state.qmlGenerator.selectedQuestion
  );
  const selectedQuestion = useSelector(
    (state) => state.qmlGenerator.questions[selectedQuestionId]
  );
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
              content: (
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
