import { useMemo } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SVGLogo from "@/components/SVGLogo";
import { Switch } from "@mui/material";

import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import { useTheme } from "@mui/material/styles";
import ThemeSwitch from "./ThemeSwitch";

export default function NavBar({ setColorMode }) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const buttons = useMemo(
    () => [
      {
        title: "Open File",
        action: () => dispatch(openModal("file")),
        icon: <SaveIcon sx={{ mr: 1 }} />,
      },
    ],
    []
  );

  const handleColorChange = (event) => {
    setColorMode(event.target.checked);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <SVGLogo sx={{ width: 30, height: 30 }} />
          <Box>
            {buttons.map((page, index) => (
              <Button key={index} onClick={page.action} variant="secondary">
                {page.icon}
                {page.title}
              </Button>
            ))}
            <ThemeSwitch
              color="default"
              value={theme.palette.mode}
              onChange={handleColorChange}
            />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
