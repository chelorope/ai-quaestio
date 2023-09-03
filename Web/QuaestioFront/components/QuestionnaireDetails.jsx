import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { useSelector } from "react-redux";

export default function NavBar() {
  const questionnaireName = useSelector((state) => state.questionnaire.name);
  const questionnaireAuthor = useSelector(
    (state) => state.questionnaire.author
  );
  const questionnaireReference = useSelector(
    (state) => state.questionnaire.reference
  );

  return (
    <Box className="flex">
      <Paper className="p-5 w-full flex justify-between my-5" elevation={3}>
        <Box className="flex">Name: {questionnaireName}</Box>
        <Box className="flex">Author: {questionnaireAuthor}</Box>
        <Box className="flex">Reference: {questionnaireReference}</Box>
      </Paper>
    </Box>
  );
}
