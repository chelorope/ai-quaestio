import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Paper from "@mui/material/Paper";
import Draggable from "react-draggable";
import FileModal from "@/components/Modal/FileModal";
import CompleteModal from "@/components/Modal/CompleteModal";
import ExportModal from "@/components/Modal/ExportModal";

import { useSelector, useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";

const getModal = (type) => {
  let Component, title;
  switch (type) {
    case "file":
      title = "Upload File";
      Component = <FileModal />;
      break;
    case "complete":
      title = "Complete";
      Component = <CompleteModal />;
      break;
    case "export":
      title = "Export";
      Component = <ExportModal />;
      break;
  }
  return [Component, title];
};

function PaperComponent(props) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableDialog() {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();

  const type = useSelector((state) => state.modal.type);
  const [Component, title] = getModal(type);

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
    >
      {title && (
        <DialogTitle sx={{ cursor: "move" }} id="draggable-dialog-title">
          {title}
        </DialogTitle>
      )}
      <DialogContent>{Component}</DialogContent>
    </Dialog>
  );
}
