import { useState, useMemo } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";

import { useDispatch } from "react-redux";
import { openModal } from "@/src/redux/modalSlice";

export default function NavBar() {
  const dispatch = useDispatch();
  const pages = useMemo(
    () => [{ title: "Open File", action: () => dispatch(openModal("file")) }],
    []
  );

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
          // sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            {pages.map((page, index) => (
              <Button
                key={index}
                sx={{ my: 2, color: "white", display: "block" }}
                onClick={page.action}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
