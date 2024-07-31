import { updateFileDetails } from "@/redux/slices/qmlGeneratorSlice";
import { exportQMLFile } from "@/redux/thunks/qmlGeneratorThunks";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function QmlGenExportTab() {
  const dispatch = useDispatch();
  const fileDetails = useSelector((state) => state.qmlGenerator.fileDetails);
  return (
    <Box>
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
