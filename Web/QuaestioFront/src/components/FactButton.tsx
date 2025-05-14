import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { SxProps, Theme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { setFactInspectorOpen } from "@/redux/slices/questionnaireSlice";

interface FactButtonProps {
  sx?: SxProps<Theme>;
}

export default function FactButton({ sx }: FactButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedFact = useAppSelector(
    (state) => state.questionnaire.selectedFact
  );
  const factInspectorOpen = useAppSelector(
    (state) => state.questionnaire.factInspectorOpen
  );

  const handleClick = (): void => {
    dispatch(setFactInspectorOpen(true));
  };

  return (
    <Button
      sx={sx}
      variant="contained"
      color="secondary"
      disabled={!selectedFact || factInspectorOpen}
      onClick={handleClick}
    >
      <Typography>Open Fact Inspector</Typography>
    </Button>
  );
}
