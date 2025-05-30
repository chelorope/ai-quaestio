"use client";
import {
  Delete as DeleteIcon,
  MoreVert,
  Save as SaveIcon,
} from "@mui/icons-material";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useMemo, useState, MouseEvent } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/modalSlice";
import { resetState } from "@/redux/slices/designerSlice";

interface MenuOption {
  title: string;
  action: () => void;
  icon: JSX.Element;
}

export default function NavMenu(): JSX.Element {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(1);

  const options: MenuOption[] = useMemo(
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

  const handleClickListItem = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (action: () => void, index: number): void => {
    action();
    setSelectedIndex(index);
    handleClose();
  };

  const handleClose = (): void => {
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
