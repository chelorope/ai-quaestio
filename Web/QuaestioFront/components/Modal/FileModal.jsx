import { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/src/redux/modalSlice";
import { openQuestionaire } from "@/src/redux/questionaireThunks";

export default function FileModal() {
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
    <form className="flex" onSubmit={handleSubmit}>
      <Button className="mr-5">
        <Typography>Select File</Typography>
        <input
          className="opacity-0 absolute  cursor-pointer"
          type="file"
          name="uploaded_file"
          accept=".qml"
          onChange={handleFileSelect}
        />
        <AttachFileIcon />
      </Button>
      <Button disabled={!file} type="submit" variant="outlined">
        Upload
      </Button>
    </form>
  );
}
