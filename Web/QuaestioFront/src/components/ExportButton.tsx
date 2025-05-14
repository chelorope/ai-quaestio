import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/material/styles";

import { useAppDispatch } from "@/redux/hooks";
import { exportQuestionnaire } from "@/redux/thunks/questionnaireThunks";

interface ExportButtonProps {
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

export default function ExportButton({
  onClick = () => {},
  sx,
}: ExportButtonProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleExport = (): void => {
    dispatch(exportQuestionnaire());
    onClick();
  };

  return (
    <Button variant="contained" onClick={handleExport} sx={sx}>
      Export DCL
    </Button>
  );
}
