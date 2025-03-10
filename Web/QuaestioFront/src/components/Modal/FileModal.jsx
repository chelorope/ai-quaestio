import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import { openQuestionnaire } from "@/redux/thunks/questionnaireThunks";
import { loadQMLFile } from "@/redux/thunks/flowThunks";

const readFile = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => resolve(event.target.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });

export default function FileModal() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const [file, setFile] = useState(null);

  const handleClose = () => dispatch(closeModal());

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Load the file into QML Editor
    const qmlText = await readFile(inputRef.current.files[0]);
    dispatch(loadQMLFile(qmlText));

    // Send the file to the server
    const data = new FormData(event.target);
    await dispatch(openQuestionnaire(data));
    handleClose();
  };

  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
      <Button sx={{ mr: 5 }}>
        <Typography>Select File</Typography>
        <input
          ref={inputRef}
          style={{ opacity: 0, position: "absolute", cursor: "pointer" }}
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
