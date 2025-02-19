import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { updateFileDetails } from "@/redux/slices/flowSlice";
import { exportQMLFile } from "@/redux/thunks/flowThunks";
import { Box, Button, TextField } from "@mui/material";

export default function QmlGenExportTab() {
  const dispatch = useAppDispatch();
  const fileDetails = useAppSelector((state) => state.flow.fileDetails);
  return (
    <Box style={{ width: "40vw" }}>
      <Box display="flex" flexDirection="column" sx={{ maxWidth: "sm" }}>
        <TextField
          sx={{ mb: 2 }}
          label="Author"
          size="small"
          value={fileDetails.author}
          onChange={(event) =>
            dispatch(updateFileDetails({ author: event.target.value }))
          }
        />
        <TextField
          sx={{ mb: 2 }}
          label="Name"
          size="small"
          value={fileDetails.name}
          onChange={(event) =>
            dispatch(updateFileDetails({ name: event.target.value }))
          }
        />
        <TextField
          sx={{ mb: 2 }}
          label="Reference"
          size="small"
          value={fileDetails.reference}
          onChange={(event) =>
            dispatch(updateFileDetails({ reference: event.target.value }))
          }
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={() => dispatch(exportQMLFile())}
      >
        Export
      </Button>
    </Box>
  );
}
