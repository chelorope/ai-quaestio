import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/src/redux/modalSlice";
import { openQuestionaire } from "@/src/redux/questionaireSlice";

export default function Modla() {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    await dispatch(openQuestionaire(data));
    handleClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="uploaded_file" accept=".qml" />
      <button type="submit">Upload</button>
    </form>
  );
}
