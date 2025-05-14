import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Tooltip from "@mui/material/Tooltip";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneIcon from "@mui/icons-material/Done";
import { SxProps, Theme } from "@mui/material/styles";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  setSelectedFact,
  toggleAnsweredFact,
} from "@/redux/slices/questionnaireSlice";

interface FactListProps {
  sx?: SxProps<Theme>;
}

// Extend Fact type to include properties we know exist in the application
interface ExtendedFact {
  description: string;
  value: boolean;
  default?: boolean;
  mandatory?: boolean;
}

// Extend Question type with answered property
interface ExtendedQuestion {
  facts: string[];
  description: string;
  answered?: boolean;
}

export default function FactList({ sx }: FactListProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const questions = useAppSelector((state) => state.questionnaire.questions);
  const facts = useAppSelector((state) => state.questionnaire.facts);
  const selectedQuestion = useAppSelector(
    (state) => state.questionnaire.selectedQuestion
  );
  const selectedFact = useAppSelector(
    (state) => state.questionnaire.selectedFact
  );
  const answeredFacts = useAppSelector(
    (state) => state.questionnaire.answeredFacts
  );

  const question = questions[selectedQuestion] as ExtendedQuestion | undefined;
  const disabled = question?.answered;

  // Return null if no question is selected
  if (!question) {
    return null;
  }

  const handleListItemClick = (id: string): void => {
    dispatch(setSelectedFact(id));
  };

  const handleToggle = (id: string) => (): void => {
    dispatch(toggleAnsweredFact(id));
  };

  return (
    <Paper sx={{ ...sx, width: "100%" }} elevation={2}>
      <List component="nav" aria-label="facts list">
        {question.facts?.map((factId) => {
          const fact = facts[factId] as ExtendedFact;
          return (
            <ListItemButton
              selected={selectedFact === factId}
              key={factId}
              onClick={() => handleListItemClick(factId)}
            >
              <ListItemText primary={fact.description} />
              {fact.mandatory && (
                <ListItemIcon>
                  <Tooltip title="Mandatory Fact">
                    <ErrorOutlineIcon />
                  </Tooltip>
                </ListItemIcon>
              )}
              {fact.default && (
                <ListItemIcon>
                  <Tooltip title="True by default">
                    <DoneIcon />
                  </Tooltip>
                </ListItemIcon>
              )}
              <ListItemIcon sx={{ minWidth: 0, ml: 1 }}>
                <Checkbox
                  disabled={!!disabled}
                  edge="start"
                  checked={!!answeredFacts[factId]}
                  tabIndex={-1}
                  disableRipple
                  onClick={handleToggle(factId)}
                />
              </ListItemIcon>
            </ListItemButton>
          );
        })}
      </List>
    </Paper>
  );
}
