import { Add, Close } from "@mui/icons-material";
import {
  Avatar,
  Collapse,
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
  onItemRemove = () => {},
}) {
  const handleItemChange = (value, id) => {
    onItemChange(value, id);
  };
  const handleItemAdd = () => {
    onItemAdd();
  };
  return (
    <List sx={{ width: 1 }}>
      {items.map((item) => (
        <ListItemButton
          sx={{ mb: 2 }}
          key={item.id}
          onClick={() => {
            onItemSelect(item.id);
          }}
          selected={selected === item.id}
        >
          <ListItemAvatar>
            <Avatar>
              <Typography>
                {itemPrefix}
                {item.id + 1}
              </Typography>
            </Avatar>
          </ListItemAvatar>
          <TextField
            value={item.description}
            onChange={(event) => handleItemChange(event.target.value, item.id)}
            fullWidth
            variant="standard"
          />
          <Collapse in={selected === item.id} orientation="horizontal">
            <Close
              sx={{ willChange: "transform", position: "relative" }}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onItemRemove(item.id);
              }}
            />
          </Collapse>
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
