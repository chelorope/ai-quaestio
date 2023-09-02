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
    <Box fluid className="flex">
      <Paper className="p-10 w-full flex justify-between my-5" elevation={3}>
        <Box fluid className="flex">
          Name: {questionaireName}
        </Box>
        <Box fluid className="flex">
          Author: {questionaireAuthor}
        </Box>
        <Box fluid className="flex">
          Reference: {questionaireReference}
        </Box>
      </Paper>
    </Box>
  );
}
