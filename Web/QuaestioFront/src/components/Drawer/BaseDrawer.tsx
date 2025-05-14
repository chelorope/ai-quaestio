import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";

import { DrawerPosition } from "@/redux/slices/drawerSlice";

interface DrawerProps {
  open: boolean;
  position: DrawerPosition;
  title: string;
  sx?: object;
  children: React.ReactNode;
  handleClose: () => void;
}

const Drawer = ({
  open,
  position,
  handleClose,
  children,
  title,
  sx,
}: DrawerProps) => (
  <MuiDrawer
    anchor={position}
    open={open}
    onClose={handleClose}
    PaperProps={{ sx: { maxWidth: "100vw" } }}
  >
    <Toolbar
      sx={{
        ...sx,
        display: "flex",
        alignItems: "center",
        justifyContent: position === "left" ? "flex-end" : "flex-start",
        px: [1],
      }}
    >
      <IconButton onClick={handleClose}>
        {position === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </IconButton>
      <Typography variant="h6">{title}</Typography>
    </Toolbar>
    <Divider />
    <Box sx={{ m: 2 }}>{children}</Box>
  </MuiDrawer>
);

export default Drawer;
