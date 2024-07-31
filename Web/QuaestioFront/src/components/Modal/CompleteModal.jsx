import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import {
  continueQuestionnaire,
  completeQuestionnaire,
} from "@/redux/thunks/questionnaireThunks";

export default function CompleteModal() {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  const handleContinue = async (event) => {
    event.preventDefault();
    dispatch(continueQuestionnaire());
    handleClose();
  };

  const handleComplete = (event) => {
    event.preventDefault();
    handleClose();
    dispatch(completeQuestionnaire());
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography sx={{ mb: 5 }}>
        All the mandatory facts have been answered and default values can be
        used for the remaining ones without violating the constraints.
      </Typography>
      <Typography sx={{ mb: 5 }}>
        Do you want to continue the configuration or let the configuration be
        automatically completed?
      </Typography>
      <Button
        sx={{ mb: 2 }}
        variant="contained"
        color="secondary"
        onClick={handleContinue}
      >
        Continue
      </Button>
      <Button variant="contained" onClick={handleComplete}>
        Complete
      </Button>
    </Box>
  );
}
