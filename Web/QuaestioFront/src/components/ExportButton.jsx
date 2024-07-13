import { useMemo } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";
import { exportQuestionnaire } from "@/redux/questionnaireThunks";

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
