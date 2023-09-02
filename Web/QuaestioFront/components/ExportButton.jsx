import { useMemo } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useDispatch } from "react-redux";
import { exportQuestionaire } from "@/src/redux/questionaireThunks";

export default function ExportButton({ onClick, className }) {
  const dispatch = useDispatch();

  const handleExport = () => {
    dispatch(exportQuestionaire());
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleExport} className={className}>
      Export DCL
    </Button>
  );
}
