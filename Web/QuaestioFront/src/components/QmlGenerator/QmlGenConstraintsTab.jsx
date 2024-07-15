import { updateConstraints } from "@/redux/qmlGeneratorSlice";
import { Box, Paper, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SelectableCardList from "./SelectableCardList";
import { useMemo, useRef } from "react";

export default function QmlGenConstraintsTab() {
  const dispatch = useDispatch();
  const constraints = useSelector((state) => state.qmlGenerator.constraints);
  const facts = useSelector((state) => state.qmlGenerator.facts);

  const inputRef = useRef(null);

  const handleConstraintInsertFact = (item) => {
    const newConstraints = constraints + `f${item + 1}`;
    dispatch(updateConstraints(newConstraints));
    inputRef.current.focus();
  };
  return (
    <Box>
      <TextField
        inputRef={inputRef}
        sx={{ mb: 2 }}
        label="Constraints"
        size="small"
        value={constraints}
        fullWidth
        onChange={(event) => dispatch(updateConstraints(event.target.value))}
        autoFocus
      />
      <Box display="flex" sx={{ flexWrap: { xs: "wrap", md: "nowrap" } }}>
        <Paper
          sx={{ mr: { md: 2 }, mb: { xs: 2, md: 0 }, p: 3, width: 1 }}
          variant="outlined"
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Facts
          </Typography>
          <SelectableCardList
            items={facts}
            onSelectToggle={handleConstraintInsertFact}
          />
        </Paper>
      </Box>
    </Box>
  );
}
