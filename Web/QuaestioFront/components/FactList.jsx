import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";

import { useDispatch, useSelector } from "react-redux";
import { selectFact, toggleAnsweredFact } from "@/src/redux/questionaireSlice";

export default function FactList() {
  const dispatch = useDispatch();
  const [selectedFact, setselectedFact] = useState();
  const selectedQuestion = useSelector(
    (state) => state.questionaire.selectedQuestion
  );
  const answeredFacts = useSelector(
    (state) => state.questionaire.answeredFacts
  );

  const handleListItemClick = (event, id) => {
    setselectedFact(id);
    dispatch(selectFact(id));
  };

  const handleToggle = (id) => () => {
    dispatch(toggleAnsweredFact(id));
  };

  console.log("SELECTED", answeredFacts);
  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        {selectedQuestion?.facts?.map((fact) => (
          <ListItemButton
            selected={selectedFact === fact.id}
            key={fact.id}
            onClick={(event) => handleListItemClick(event, fact.id)}
          >
            <ListItemText primary={fact.description} />
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={answeredFacts[fact.id]}
                tabIndex={-1}
                disableRipple
                onClick={handleToggle(fact.id)}
              />
            </ListItemIcon>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
