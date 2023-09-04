import { useMemo } from "react";
import SaveIcon from "@mui/icons-material/Save";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import SVGLogo from "@/components/SVGLogo";

import { useDispatch } from "react-redux";
import { openModal } from "@/src/redux/modalSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const buttons = useMemo(
    () => [
      {
        title: "Open File",
        action: () => dispatch(openModal("file")),
        icon: <SaveIcon className="mr-2" />,
      },
    ],
    []
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters className="justify-between">
          <SVGLogo className="w-8 h-8" />
          <Box>
            {buttons.map((page, index) => (
              <Button key={index} onClick={page.action}>
                {page.icon}
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
