import { Box, FormControlLabel, Switch, TextField } from "@mui/material";

export default function QmlGenDetails({
  isMandatory,
  onMandatoryChange = () => {},
  isDefault,
  onDefaultChange = () => {},
  guidelines,
  onGuidelinesChange = () => {},
}) {
  return (
    <Box display="flex" flexDirection="column">
      {isMandatory !== undefined ? (
        <FormControlLabel
          sx={{ mb: 1 }}
          control={<Switch />}
          label="Mandatory"
          checked={isMandatory}
          onChange={(event) => onMandatoryChange(event.target.checked)}
        />
      ) : null}
      {isDefault !== undefined ? (
        <FormControlLabel
          sx={{ mb: 3 }}
          control={<Switch />}
          label="Default"
          checked={isDefault}
          onChange={(event) => onDefaultChange(event.target.checked)}
        />
      ) : null}
      <TextField
        label="Guidelines"
        value={guidelines}
        onChange={(event) => onGuidelinesChange(event.target.value)}
        rows={4}
        multiline
        fullWidth
      />
    </Box>
  );
}
