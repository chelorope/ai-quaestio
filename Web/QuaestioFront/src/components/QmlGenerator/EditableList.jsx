import { Add } from "@mui/icons-material";
import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

export default function EditableList({
  items = [],
  selected,
  itemPrefix = "Q",
  onItemChange = () => {},
  onItemSelect = () => {},
  onItemAdd = () => {},
}) {
  const handleItemChange = (value, index) => {
    onItemChange(value, index);
  };
  const handleItemAdd = () => {
    onItemAdd();
  };
  return (
    <List sx={{ width: 1 }}>
      {items.map((item, index) => (
        <ListItemButton
          sx={{ mb: 2 }}
          key={index}
          onClick={() => {
            onItemSelect(index);
          }}
          selected={selected === index}
        >
          <ListItemAvatar>
            <Avatar>
              <Typography>
                {itemPrefix}
                {index + 1}
              </Typography>
            </Avatar>
          </ListItemAvatar>
          <TextField
            value={item}
            onChange={(event) => handleItemChange(event.target.value, index)}
            fullWidth
            variant="standard"
          />
        </ListItemButton>
      ))}
      <ListItemButton sx={{ mb: 2 }} onClick={handleItemAdd}>
        <ListItemIcon>
          <Add />
        </ListItemIcon>
        <ListItemText primary="Add new" />
      </ListItemButton>
    </List>
  );
}
