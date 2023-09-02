import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import { useSelector } from "react-redux";

export default function NavBar() {
  const questionaireName = useSelector((state) => state.questionaire.name);
  const questionaireAuthor = useSelector((state) => state.questionaire.author);
  const questionaireReference = useSelector(
    (state) => state.questionaire.reference
  );

  return (
    <Box className="flex">
      <Paper className="p-5 w-full flex justify-between my-5" elevation={3}>
        <Box className="flex">Name: {questionaireName}</Box>
        <Box className="flex">Author: {questionaireAuthor}</Box>
        <Box className="flex">Reference: {questionaireReference}</Box>
      </Paper>
    </Box>
  );
}
