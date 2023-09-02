import MUIModal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import FileModal from "@/components/Modal/FileModal";
import CompleteModal from "@/components/Modal/CompleteModal";
import ExportModal from "@/components/Modal/ExportModal";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/src/redux/modalSlice";

const getModal = (type) => {
  switch (type) {
    case "file":
      return <FileModal />;
    case "complete":
      return <CompleteModal />;
    case "export":
      return <ExportModal />;
  }
};

export default function Modal() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const type = useSelector((state) => state.modal.type);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <MUIModal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{getModal(type)}</Box>
    </MUIModal>
  );
}
