import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneIcon from "@mui/icons-material/Done";

import { useDispatch, useSelector } from "react-redux";
import { selectFact, toggleAnsweredFact } from "@/src/redux/questionaireSlice";

export default function FactList() {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionaire.questions);
  const facts = useSelector((state) => state.questionaire.facts);
  const selectedQuestion = useSelector(
    (state) => state.questionaire.selectedQuestion
  );
  const selectedFact = useSelector((state) => state.questionaire.selectedFact);
  const answeredFacts = useSelector(
    (state) => state.questionaire.answeredFacts
  );

  const question = questions[selectedQuestion];
  const disabled = question?.answered;

  const handleListItemClick = (id) => {
    dispatch(selectFact(id));
  };

  const handleToggle = (id) => () => {
    dispatch(toggleAnsweredFact(id));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="main mailbox folders">
        {question?.facts?.map((factId) => (
          <ListItemButton
            selected={selectedFact === factId}
            key={factId}
            onClick={(event) => handleListItemClick(factId)}
          >
            <ListItemText primary={facts[factId].description} />
            {facts[factId].mandatory && (
              <ListItemIcon>
                <Tooltip title="Mandatory Fact">
                  <ErrorOutlineIcon />
                </Tooltip>
              </ListItemIcon>
            )}
            {facts[factId].default && (
              <ListItemIcon>
                <Tooltip title="True by default">
                  <DoneIcon />
                </Tooltip>
              </ListItemIcon>
            )}
            <ListItemIcon>
              <Checkbox
                disabled={disabled}
                edge="start"
                checked={!!answeredFacts[factId]}
                tabIndex={-1}
                disableRipple
                onClick={handleToggle(factId)}
              />
            </ListItemIcon>
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}
