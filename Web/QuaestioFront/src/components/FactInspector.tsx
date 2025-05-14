import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { SxProps, Theme } from "@mui/material/styles";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setFactInspectorOpen } from "@/redux/slices/questionnaireSlice";

interface FactInspectorProps {
  sx?: SxProps<Theme>;
}

interface InputField {
  label: string;
  value?: string;
}

// Extend Fact type to include properties we know exist in the application
interface ExtendedFact {
  description: string;
  value: boolean;
  default?: boolean;
  mandatory?: boolean;
}

export default function FactInspector({
  sx,
}: FactInspectorProps): JSX.Element | null {
  const dispatch = useAppDispatch();
  const facts = useAppSelector((state) => state.questionnaire.facts);
  const factInspectorOpen = useAppSelector(
    (state) => state.questionnaire.factInspectorOpen
  );

  const selectedFact = useAppSelector(
    (state) => state.questionnaire.selectedFact
  );

  // Early return if inspector is not open or no fact is selected
  if (!factInspectorOpen || !selectedFact) {
    return null;
  }

  // Cast to extended fact type to access all properties
  const currentFact = facts[selectedFact] as ExtendedFact;

  const inputs: InputField[] = [
    { label: "Description", value: currentFact.description },
    { label: "Id", value: selectedFact },
    { label: "Default", value: currentFact.default?.toString() ?? "false" },
    { label: "Mandatory", value: currentFact.mandatory?.toString() ?? "false" },
  ];

  return (
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
          {inputs.map(({ label, value }, index) => (
            <TextField
              key={index}
              sx={{ width: 0.8, ml: 4, color: "text.primary" }}
              label={label}
              size="small"
              value={value || ""}
              disabled
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
}
