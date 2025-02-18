import { Avatar, Box, Paper, Typography } from "@mui/material";

function Legend() {
  return (
    <Paper
      variant="outlined"
      sx={{ p: 2, display: "flex", flexDirection: "row" }}
    >
      <Box sx={{ mr: 4 }}>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: "45px",
              height: "20px",
              background: "#ffffcc",
              border: "1px solid",
              borderColor: "divider",
              mr: 1,
            }}
          />
          <Typography variant="body2">Question</Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          <Box
            sx={{
              width: "45px",
              height: "20px",
              background: "#c7ceab",
              border: "1px solid",
              borderColor: "divider",
              mr: 1,
            }}
          />
          <Typography variant="body2">Fact</Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          <Box
            sx={{
              width: "45px",
              height: "20px",
              mr: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                color: "grey.800",
                background: "#ccffcc",
                fontSize: 10,
                mr: 0.5,
                width: 20,
                height: 20,
              }}
            >
              T
            </Avatar>
          </Box>
          <Typography variant="body2">Fact True by Default</Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          <Box
            sx={{
              width: "45px",
              height: "20px",
              mr: 1,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Avatar
              sx={{
                color: "grey.800",
                background: "#ffcc99",
                fontSize: 10,
                mr: 0.5,
                width: 20,
                height: 20,
              }}
            >
              M
            </Avatar>
          </Box>
          <Typography variant="body2">Mandatory Fact</Typography>
        </Box>
      </Box>
      <Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: "45px",
              height: "1px",
              borderTop: "3px dashed #b1b1b7",
              mr: 1,
              position: "relative",
              "::before": {
                content: "''",
                display: "block",
                width: "18px",
                height: "3px",
                transform: "rotate(-30deg)",
                bottom: 4,
                left: -3,
                backgroundColor: "#b1b1b7",
                position: "absolute",
              },
              "::after": {
                content: "''",
                display: "block",
                width: "18px",
                height: "3px",
                transform: "rotate(30deg)",
                top: 1,
                left: -3,
                backgroundColor: "#b1b1b7",
                position: "absolute",
              },
            }}
          />
          <Typography variant="body2">X partially depends on Y</Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          <Box
            sx={{
              width: "45px",
              height: "1px",
              borderTop: "3px solid #b1b1b7",
              mr: 1,
              position: "relative",
              "::before": {
                content: "''",
                display: "block",
                width: "18px",
                height: "3px",
                transform: "rotate(-30deg)",
                bottom: 4,
                left: -3,
                backgroundColor: "#b1b1b7",
                position: "absolute",
              },
              "::after": {
                content: "''",
                display: "block",
                width: "18px",
                height: "3px",
                transform: "rotate(30deg)",
                top: 1,
                left: -3,
                backgroundColor: "#b1b1b7",
                position: "absolute",
              },
            }}
          />
          <Typography variant="body2">X fully depends on Y</Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
          <Box
            sx={{
              width: "45px",
              height: "2px",
              background: "#b1b1b7",
              mr: 1,
            }}
          />
          <Typography variant="body2">Mapping Question - Fact</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default Legend;
