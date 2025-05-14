import {
  addConstraint,
  removeConstraint,
  updateConstraint,
  selectConstraints,
  selectFacts,
} from "@/redux/slices/designerSlice";
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import SelectableCardList from "@/components/SelectableCardList";
import { useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { Close as CloseIcon } from "@mui/icons-material";

const operators = [
  { id: "x", description: "ADD CONSTRAINT" },
  { id: "(", description: "(" },
  { id: ")", description: ")" },
  { id: ".", description: "AND" },
  { id: "+", description: "OR" },
  { id: "-", description: "NOT" },
  { id: "xor(", description: "XOR" },
  { id: "nor(", description: "NOR" },
  { id: "=>", description: "THEN" },
  { id: "=", description: "IFONLY" },
];

export default function ConstraintsDrawer() {
  const dispatch = useAppDispatch();
  const constraints = useAppSelector(selectConstraints);
  const facts = useAppSelector(selectFacts);

  const [selectedConstraintIndex, setSelectedConstraintIndex] = useState<
    number | null
  >(null);

  const cardFacts = useMemo(
    () =>
      facts.map((fact) => ({
        id: fact.id?.toLowerCase(),
        description: fact.data.title,
      })),
    [facts]
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const handleFactSelect = (id: string) => {
    if (selectedConstraintIndex === null) return;
    const currentValue = constraints[selectedConstraintIndex];
    dispatch(
      updateConstraint({
        index: selectedConstraintIndex,
        value: currentValue + `${id}`,
      })
    );
    inputRef.current?.focus();
  };

  const handleOperatorSelect = (id: string) => {
    if (selectedConstraintIndex === null) return;

    // Special case for ADD CONSTRAINT
    if (id === "x") {
      dispatch(addConstraint());
      setSelectedConstraintIndex(constraints.length);
      return;
    }

    const currentValue = constraints[selectedConstraintIndex];
    dispatch(
      updateConstraint({
        index: selectedConstraintIndex,
        value: currentValue + ` ${id}`,
      })
    );
    inputRef.current?.focus();
  };

  return (
    <Box sx={{ width: "80vw" }}>
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        justifyContent="space-between"
      >
        {constraints.map((constraint, index) => (
          <Box
            key={index}
            display="flex"
            alignItems="center"
            sx={{ width: "48%" }}
            position="relative"
          >
            <TextField
              inputRef={index === selectedConstraintIndex ? inputRef : null}
              label={`Constraint ${index + 1}`}
              size="small"
              value={constraint}
              fullWidth
              autoFocus={index === selectedConstraintIndex}
              onChange={(event) =>
                dispatch(
                  updateConstraint({ index: index, value: event.target.value })
                )
              }
              onFocus={() => setSelectedConstraintIndex(index)}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => dispatch(removeConstraint(index))}
                        edge="end"
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Box>
        ))}
      </Box>
      <Box
        display="flex"
        sx={{ flexWrap: { xs: "wrap", md: "nowrap" }, mt: 2 }}
      >
        <Paper
          sx={{ mr: { md: 2 }, mb: { xs: 2, md: 0 }, p: 3, width: 1 }}
          variant="outlined"
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Facts
          </Typography>
          <SelectableCardList items={cardFacts} onSelect={handleFactSelect} />
        </Paper>
        <Paper sx={{ p: 3, width: 1 }} variant="outlined">
          <Typography variant="h6" sx={{ mb: 2 }}>
            Operators
          </Typography>
          <SelectableCardList
            showIcon={false}
            items={operators}
            onSelect={handleOperatorSelect}
          />
        </Paper>
      </Box>
    </Box>
  );
}
