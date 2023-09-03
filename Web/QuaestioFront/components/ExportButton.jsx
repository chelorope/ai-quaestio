import { useMemo } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";
import { exportQuestionnaire } from "@/src/redux/questionnaireThunks";

export default function ExportButton({ onClick = () => {}, className }) {
  const dispatch = useDispatch();

  const handleExport = () => {
    dispatch(exportQuestionnaire());
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleExport} className={className}>
      Export DCL
    </Button>
  );
}
