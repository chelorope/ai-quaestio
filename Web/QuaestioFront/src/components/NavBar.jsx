import { useMemo } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SVGLogo from "@/components/SVGLogo";
import { IconButton, Switch } from "@mui/material";

import { useDispatch } from "react-redux";
import { openModal } from "@/redux/modalSlice";
import { useTheme } from "@mui/material/styles";
import ThemeSwitch from "./ThemeSwitch";
import { MoreVert } from "@mui/icons-material";
import NavMenu from "./NavMenu";
import Link from "next/link";

export default function NavBar({ setColorMode }) {
  const theme = useTheme();

  const handleColorChange = (event) => {
    setColorMode(event.target.checked);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link href="/">
            <SVGLogo sx={{ width: 30, height: 30 }} />
          </Link>
          <Box>
            <ThemeSwitch
              color="default"
              value={theme.palette.mode}
              onChange={handleColorChange}
            />
            <NavMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
