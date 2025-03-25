import {
  selectConstraints,
  selectFacts,
  updateConstraints,
} from "@/redux/slices/designerSlice";
import { Box, Paper, TextField, Typography } from "@mui/material";
import SelectableCardList from "@/components/QmlGenerator/SelectableCardList";
import { useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

const operators = [
  { id: ".", description: "AND" },
  { id: "+", description: "OR" },
  { id: "-", description: "NOT" },
  { id: "xor(", description: "XOR" },
  { id: "nor(", description: "NOR" },
  { id: "=>", description: "Implies" },
  { id: "=", description: "Iff" },
];

export default function ConstraintsDrawer() {
  const dispatch = useAppDispatch();
  const constraints = useAppSelector(selectConstraints);
  const facts = useAppSelector(selectFacts);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleConstraintInsertFact = (item) => {
    const newConstraints = constraints + item;
    dispatch(updateConstraints(newConstraints));
    inputRef.current?.focus();
  };

  const handleConstraintInsertOperator = (item) => {
    const newConstraints = constraints + item;
    dispatch(updateConstraints(newConstraints));
    inputRef.current?.focus();
  };

  return (
    <Box sx={{ width: "80vw" }}>
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
            onSelect={handleConstraintInsertFact}
          />
        </Paper>
        <Paper sx={{ p: 3, width: 1 }} variant="outlined">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Operators
          </Typography>
          <SelectableCardList
            showIcon={false}
            items={operators}
            onSelect={handleConstraintInsertOperator}
          />
        </Paper>
      </Box>
    </Box>
  );
}
