import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { useDispatch } from "react-redux";
import { closeModal } from "@/redux/slices/modalSlice";
import ExportButton from "@/components/ExportButton";

export default function ExportModal() {
  const dispatch = useDispatch();
  const handleClose = () => dispatch(closeModal());

  const handleExport = async () => {
    handleClose();
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography sx={{ mb: 5 }}>
        All the facts have been set correctly.
      </Typography>
      <Typography sx={{ mb: 5 }}>
        Click Export DCL to export this configuration.
      </Typography>
      <ExportButton sx={{ mb: 5 }} onClick={handleExport} />
      <Button variant="contained" color="secondary" onClick={handleClose}>
        Cancel
      </Button>
    </Box>
  );
}
