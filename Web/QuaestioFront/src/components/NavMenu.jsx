"use client";
import {
  Delete as DeleteIcon,
  MoreVert,
  Save as SaveIcon,
} from "@mui/icons-material";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "@/redux/slices/modalSlice";
import { resetState } from "@/redux/slices/flowSlice";

export default function NavMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const options = useMemo(
    () => [
      {
        title: "Open File",
        action: () => {
          dispatch(openModal("file"));
        },
        icon: <SaveIcon sx={{ mr: 1 }} />,
      },
      {
        title: "Clear Data",
        action: () => {
          dispatch(resetState());
        },
        icon: <DeleteIcon sx={{ mr: 1 }} />,
      },
    ],
    [dispatch]
  );

  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (action, index) => {
    action();
    setSelectedIndex(index);
    handleClose();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton onClick={handleClickListItem}>
        <MoreVert sx={{ color: "white" }} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        slotProps={{ paper: { sx: { marginTop: 2 } } }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            selected={index === selectedIndex}
            onClick={() => handleMenuItemClick(option.action, index)}
          >
            <ListItemIcon>{option.icon}</ListItemIcon>
            {option.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
