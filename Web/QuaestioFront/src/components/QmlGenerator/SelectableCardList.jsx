import { Avatar, Card, CardActionArea, Typography } from "@mui/material";

export default function SelectableCardList({
  items = [],
  selected = [],
  onSelectToggle = () => {},
  itemPrefix = "F",
}) {
  return items.map((item, index) => {
    const isSelected = selected[index];
    return (
      <Card
        sx={{
          mb: 1,
        }}
        key={index}
        elevation={isSelected ? 5 : 1}
        onClick={() => onSelectToggle(index)}
      >
        <CardActionArea
          sx={(theme) => ({
            display: "flex",
            justifyContent: "flex-start",
            p: 3,
            ...(isSelected
              ? {
                  boxShadow: `inset 0 0 10px -2px ${theme.palette.primary.main}`,
                }
              : {}),
          })}
        >
          <Avatar>
            <Typography>
              {itemPrefix}
              {index + 1}
            </Typography>
          </Avatar>
          <Typography sx={{ ml: 1 }} vatiant="body2">
            {item.description}
          </Typography>
        </CardActionArea>
      </Card>
    );
  });
}
