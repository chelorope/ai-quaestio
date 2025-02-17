import {
  ErrorOutline as ErrorOutlineIcon,
  Done as DoneIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActionArea,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";

export default function SelectableCardList({
  items = [],
  selected = [],
  onSelect = () => {},
  itemPrefix = "F",
  showIcon = true,
}) {
  return items.map((item) => {
    const isSelected = selected[item.id];
    return (
      <Card
        sx={{
          mb: 1,
        }}
        key={item.id}
        elevation={isSelected ? 5 : 1}
        onClick={() => onSelect(item.id)}
      >
        <CardActionArea
          sx={(theme) => ({
            display: "flex",
            justifyContent: "space-between",
            p: 3,
            ...(isSelected
              ? {
                  boxShadow: `inset 0 0 10px -2px ${theme.palette.primary.main}`,
                }
              : {}),
          })}
        >
          <Box display="flex" alignItems="center">
            {showIcon && (
              <Avatar>
                <Typography>
                  {typeof item.id === "string"
                    ? item.id
                    : `${itemPrefix}${item.id + 1}`}
                </Typography>
              </Avatar>
            )}
            <Typography sx={{ ml: 1 }} vatiant="body2" textOverflow="ellipsis">
              {item.description}
            </Typography>
          </Box>
          <Box display="flex">
            {item.mandatory && (
              <Tooltip title="Mandatory Fact">
                <ErrorOutlineIcon sx={{ mr: 1 }} />
              </Tooltip>
            )}
            {item.default && (
              <Tooltip title="True by default">
                <DoneIcon />
              </Tooltip>
            )}
          </Box>
        </CardActionArea>
      </Card>
    );
  });
}
