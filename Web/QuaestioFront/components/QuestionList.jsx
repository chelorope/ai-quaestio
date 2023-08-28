import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useDispatch } from "react-redux";
import { selectQuestion } from "@/src/redux/questionaireSlice";

export default function QuestionsList({ questions = [] }) {
  const dispatch = useDispatch();
  const [selectedQuestion, setselectedQuestion] = useState();

  const handleListItemClick = (event, question) => {
    setselectedQuestion(question.id);
    dispatch(selectQuestion(question));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        {questions.map((question) => (
          <ListItemButton
            selected={selectedQuestion === question.id}
            key={question.id}
            onClick={(event) => handleListItemClick(event, question)}
          >
            <ListItemText primary={question.description} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
