import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AttachFileIcon from "@mui/icons-material/AttachFile";

import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import { openQuestionnaire } from "@/redux/thunks/questionnaireThunks";
import {
  flowLayout,
  loadQMLFile,
  loadXMIFile,
} from "@/redux/thunks/designerThunks";

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
    console.log("File selected", file);
    // Load the file into QML Editor
    const fileExtension = file?.name.split(".")[1];
    const fileText = await readFile(inputRef.current.files[0]);
    console.log("fileExtension", fileExtension);
    let loader;
    switch (fileExtension) {
      case "qml":
        loader = loadQMLFile;
        break;
      case "xmi":
        loader = loadXMIFile;
        break;
      default:
        loader = loadQMLFile;
        break;
    }
    console.log("File text", fileText);
    dispatch(loader(fileText));
    // Close the modal
    dispatch(flowLayout());

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
          accept=".qml,.xmi"
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
