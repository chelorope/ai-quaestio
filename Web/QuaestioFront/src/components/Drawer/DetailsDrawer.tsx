import { FormControlLabel, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { ChangeEvent, SyntheticEvent } from "react";

export default function DetailsDrawer({
  id,
  isDefault,
  onDefaultChange,
  isMandatory,
  onMandatoryChange,
  title,
  onTitleChange,
  guidelines,
  onGuidelinesChange,
}: {
  id: string;
  isDefault?: boolean;
  onDefaultChange?: (value: boolean) => void;
  isMandatory?: boolean;
  onMandatoryChange?: (value: boolean) => void;
  title: string;
  onTitleChange: (value: string) => void;
  guidelines: string;
  onGuidelinesChange: (value: string) => void;
}) {
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onTitleChange(event.target.value);
  };

  const handleGuidelinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    onGuidelinesChange(event.target.value);
  };

  const handleSwitchChange = (handler: (checked: boolean) => void) => {
    return (_event: SyntheticEvent<Element, Event>, checked: boolean) => {
      handler(checked);
    };
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
      <TextField
        label="ID"
        value={id}
        size="small"
        sx={{ mt: 2, mb: 3, width: 300 }}
        disabled
      />
      {isMandatory !== undefined && onMandatoryChange ? (
        <FormControlLabel
          sx={{ mb: 1 }}
          control={<Switch />}
          label="Mandatory"
          checked={isMandatory}
          onChange={handleSwitchChange(onMandatoryChange)}
        />
      ) : null}
      {isDefault !== undefined && onDefaultChange ? (
        <FormControlLabel
          sx={{ mb: 3 }}
          control={<Switch />}
          label="Default"
          checked={isDefault}
          onChange={handleSwitchChange(onDefaultChange)}
        />
      ) : null}
      <TextField
        label="Title"
        value={title}
        onChange={handleTitleChange}
        size="small"
        sx={{ mb: 3, width: 300 }}
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
