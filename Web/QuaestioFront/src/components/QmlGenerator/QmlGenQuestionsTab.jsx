import {
  Box,
  FormControlLabel,
  Paper,
  TextField,
  TextareaAutosize,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { useState } from "react";
import TabPanel from "@/components/TabPanel";
import QmlGenQuestions from "./QmlGenQuestions";
import TabsView from "./TabsView";
import QmlGenQuestionDetails from "./QmlGenQuestionDetails";
import { useSelector } from "react-redux";

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
              content: (
                <TextField
                  label="Facts Guidelines"
                  rows={4}
                  multiline
                  fullWidth
                />
              ),
            },
            {
              label: "Fully Depends",
              content: <TextField label="Fully" rows={4} multiline fullWidth />,
            },
            {
              label: "Partially Depends",
              content: (
                <TextField label="Partially" rows={4} multiline fullWidth />
              ),
            },
          ]}
        />
      </Paper>
    </Box>
  );
}
