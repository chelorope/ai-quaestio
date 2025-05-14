"use client";
import { useLayoutEffect, useMemo, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import mainTheme from "@/theme";
import NavBar from "@/components/NavBar";
import Modal from "@/components/Modal/Modal";
import StoreProvider from "@/redux/StoreProvider";

type ColorMode = "light" | "dark";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): JSX.Element {
  const [colorMode, setColorMode] = useState<ColorMode>("light");

  const theme = useMemo(
    () =>
      createTheme({
        ...mainTheme,
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  const handleSetColorMode = (mode: ColorMode): void => {
    localStorage.setItem("colorMode", mode);
    setColorMode(mode);
  };

  useLayoutEffect(() => {
    const mode = localStorage.getItem("colorMode") as ColorMode | null;
    if (mode) setColorMode(mode);
  }, []);

  return (
    <html lang="en" style={{ height: "100%" }}>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <body
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <NavBar colorMode={colorMode} setColorMode={handleSetColorMode} />
            {children}
            <Modal />
          </body>
        </ThemeProvider>
      </StoreProvider>
    </html>
  );
}
