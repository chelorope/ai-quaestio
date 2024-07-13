import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";

import { setFactInspectorOpen } from "@/redux/questionnaireSlice";

export default function FactButton({ sx }) {
  const dispatch = useDispatch();
  const selectedFact = useSelector((state) => state.questionnaire.selectedFact);
  const factInspectorOpen = useSelector(
    (state) => state.questionnaire.factInspectorOpen
  );

  const handleClick = () => {
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
