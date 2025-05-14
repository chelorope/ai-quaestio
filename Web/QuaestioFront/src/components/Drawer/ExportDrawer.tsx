import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setFileDetails } from "@/redux/slices/designerSlice";
import { exportQMLFile, exportXMIFile } from "@/redux/thunks/designerThunks";
import { Box, Button, TextField } from "@mui/material";

export const ExportDrawer = () => {
  const dispatch = useAppDispatch();
  const fileDetails = useAppSelector((state) => state.designer.fileDetails);

  const handleExport = () => {
    if (!fileDetails.name) {
      return;
    }
    dispatch(exportQMLFile());
    dispatch(exportXMIFile());
  };

  return (
    <Box style={{ width: "40vw" }}>
      <TextField
        fullWidth
        margin="normal"
        label="Author"
        value={fileDetails.author}
        onChange={(event) =>
          dispatch(setFileDetails({ author: event.target.value }))
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="File Name"
        value={fileDetails.name}
        onChange={(event) =>
          dispatch(setFileDetails({ name: event.target.value }))
        }
      />
      <TextField
        fullWidth
        margin="normal"
        label="Reference"
        value={fileDetails.reference}
        onChange={(event) =>
          dispatch(setFileDetails({ reference: event.target.value }))
        }
      />
      <Button
        style={{ marginTop: "2rem" }}
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleExport}
      >
        Export
      </Button>
    </Box>
  );
};
