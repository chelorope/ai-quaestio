import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useDispatch } from "react-redux";
import { closeModal } from "@/src/redux/modalSlice";
import ExportButton from "@/components/ExportButton";

export default function ExportModal() {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  const handleExport = async () => {
    handleClose();
  };

  return (
    <Box className="flex flex-col">
      <Typography className="mb-5">
        All the facts have been set correctly.
      </Typography>
      <Typography className="mb-5">
        Click Export DCL to export this configuration.
      </Typography>
      <ExportButton className="mb-5" onClick={handleExport} />
      <Button variant="contained" color="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </Box>
  );
}
