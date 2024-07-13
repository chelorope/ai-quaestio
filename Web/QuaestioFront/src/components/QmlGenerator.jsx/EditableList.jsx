import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";

export default function EditableList({ items = [], onItemChange = () => {} }) {
  const handleItemChange = (value, index) => {
    onItemChange(value, index);
  };
  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {items.map((item, index) => (
        <ListItemButton sx={{ mb: 2 }} key={index}>
          <ListItemAvatar>
            <Avatar>
              <Typography>Q1</Typography>
            </Avatar>
          </ListItemAvatar>
          <TextField
            value={item}
            onItemChange={(event) =>
              handleItemChange(event.target.value, index)
            }
            fullWidth
            variant="standard"
          />
        </ListItemButton>
      ))}
    </List>
  );
}
