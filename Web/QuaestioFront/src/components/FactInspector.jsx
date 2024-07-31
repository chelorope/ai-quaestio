import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector, useDispatch } from "react-redux";
import { setFactInspectorOpen } from "@/redux/slices/questionnaireSlice";

export default function FactInspector({ sx }) {
  const dispatch = useDispatch();
  const facts = useSelector((state) => state.questionnaire.facts);
  const factInspectorOpen = useSelector(
    (state) => state.questionnaire.factInspectorOpen
  );

  const selectedFact = useSelector((state) => state.questionnaire.selectedFact);
  const inputs = [
    { label: "Description", value: facts[selectedFact]?.description },
    { label: "Id", value: facts[selectedFact]?.id },
    { label: "Default", value: facts[selectedFact]?.default.toString() },
    { label: "Mandatory", value: facts[selectedFact]?.mandatory.toString() },
  ];

  return (
    factInspectorOpen &&
    selectedFact && (
      <Card sx={{ ...sx, width: 1, mt: 3 }}>
        <CardHeader
          action={
            <CardActions>
              <CloseIcon
                sx={{ cursor: "pointer" }}
                onClick={() => dispatch(setFactInspectorOpen(false))}
              />
            </CardActions>
          }
          title="Fact Inspector"
          titleTypographyProps={{ variant: "h6" }}
        />
        <Divider />
        <CardContent>
          <Box display="flex">
            {inputs.map(({ label, value }) => (
              <TextField
                sx={{ width: 0.8, ml: 4, color: "text.primary" }}
                label={label}
                size="small"
                value={value}
                disabled
              />
            ))}
          </Box>
        </CardContent>
      </Card>
    )
  );
}
