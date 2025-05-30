import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SVGLogo from "@/components/SVGLogo";

import ThemeSwitch from "./ThemeSwitch";
import NavMenu from "./NavMenu";
import Link from "next/link";

type ColorMode = "light" | "dark";

interface NavBarProps {
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
}

export default function NavBar({
  colorMode,
  setColorMode,
}: NavBarProps): JSX.Element {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Box display="flex" alignItems="center">
            <Link href="/">
              <SVGLogo sx={{ width: 30, height: 30 }} />
            </Link>
            <Button component={Link} href="/" sx={{ color: "grey.100", ml: 2 }}>
              Quaestio
            </Button>
            <Button
              component={Link}
              href="/designer"
              sx={{ color: "grey.100" }}
            >
              Designer
            </Button>
          </Box>
          <Box>
            <ThemeSwitch
              color="default"
              checked={colorMode === "dark"}
              onChange={setColorMode}
            />
            <NavMenu />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
