import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/src/redux/modalSlice";
import { openQuestionaire } from "@/src/redux/questionaireThunks";

export default function Modla() {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());
  const [file, setFile] = useState(null);

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    await dispatch(openQuestionaire(data));
    handleClose();
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <Typography className="mb-5">
        All the mandatory facts have been answered and default values can be
        used for the remaining ones without violating the constraints.
      </Typography>
      <Typography className="mb-5">
        Do you want to continue the configuration or let the configuration be
        automatically completed?
      </Typography>
      <Button className="mb-5" variant="contained">
        Complete
      </Button>
      <Button variant="contained" color="secondary">
        Continue
      </Button>
    </form>
  );
}
