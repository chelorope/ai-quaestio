import { FormControlLabel, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function DetailsDrawer({
  isDefault,
  onDefaultChange,
  isMandatory,
  onMandatoryChange,
  title,
  onTitleChange,
  guidelines,
  onGuidelinesChange,
}: {
  isDefault?: boolean;
  onDefaultChange?: (value: boolean) => void;
  isMandatory?: boolean;
  onMandatoryChange?: (value: boolean) => void;
  title: string;
  onTitleChange: (value: string) => void;
  guidelines: string;
  onGuidelinesChange: (value: string) => void;
}) {
  const handleTitleChange = (event) => {
    onTitleChange(event.target.value);
  };

  const handleGuidelinesChange = (event) => {
    onGuidelinesChange(event.target.value);
  };

  return (
    <Box
      sx={{
        width: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {isMandatory !== undefined && onMandatoryChange ? (
        <FormControlLabel
          sx={{ mb: 1 }}
          control={<Switch />}
          label="Mandatory"
          checked={isMandatory}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onMandatoryChange(event.target.checked)
          }
        />
      ) : null}
      {isDefault !== undefined && onDefaultChange ? (
        <FormControlLabel
          sx={{ mb: 3 }}
          control={<Switch />}
          label="Default"
          checked={isDefault}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onDefaultChange(event.target.checked)
          }
        />
      ) : null}
      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
        size="small"
        sx={{ mt: 2, width: 300 }}
      />
      <TextField
        label="Guidelines"
        value={guidelines}
        onChange={handleGuidelinesChange}
        rows={4}
        multiline
        fullWidth
      />
    </Box>
  );
}
