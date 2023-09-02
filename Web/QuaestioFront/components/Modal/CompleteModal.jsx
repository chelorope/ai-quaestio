import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useDispatch } from "react-redux";
import { closeModal } from "@/src/redux/modalSlice";
import {
  continueQuestionaire,
  completeQuestionaire,
} from "@/src/redux/questionaireThunks";

export default function CompleteModal() {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  const handleContinue = async (event) => {
    event.preventDefault();
    dispatch(continueQuestionaire());
    handleClose();
  };

  const handleComplete = (event) => {
    event.preventDefault();
    handleClose();
    dispatch(completeQuestionaire());
  };

  return (
    <Box className="flex flex-col">
      <Typography className="mb-5">
        All the mandatory facts have been answered and default values can be
        used for the remaining ones without violating the constraints.
      </Typography>
      <Typography className="mb-5">
        Do you want to continue the configuration or let the configuration be
        automatically completed?
      </Typography>
      <Button
        className="mb-5"
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
