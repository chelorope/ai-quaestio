import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { useSelector } from "react-redux";

export default function QuestionnaireDetails({ sx }) {
  const questionnaireName = useSelector((state) => state.questionnaire.name);
  const questionnaireAuthor = useSelector(
    (state) => state.questionnaire.author
  );
  const questionnaireReference = useSelector(
    (state) => state.questionnaire.reference
  );

  return (
    <Box sx={sx} display="flex">
      <Paper
        sx={{
          p: 3,
          width: 1,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box display="flex">Name: {questionnaireName}</Box>
        <Box display="flex">Author: {questionnaireAuthor}</Box>
        <Box display="flex">Reference: {questionnaireReference}</Box>
      </Paper>
    </Box>
  );
}
