import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { exportQuestionnaire } from "@/redux/thunks/questionnaireThunks";

export default function ExportButton({ onClick = () => {}, sx }) {
  const dispatch = useDispatch();

  const handleExport = () => {
    dispatch(exportQuestionnaire());
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleExport} sx={sx}>
      Export DCL
    </Button>
  );
}
