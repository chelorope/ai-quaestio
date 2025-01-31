import React, { memo, useCallback, useEffect, useRef } from "react";
import { Handle, NodeToolbar, Position, useReactFlow } from "@xyflow/react";
import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addFact } from "@/redux/slices/flowSlice";

function QuestionNode(props) {
  const inputRef = useRef();
  const dispatch = useDispatch();

  const { getNode, setCenter } = useReactFlow();

  const onChange = (event) => console.log("text changed", event.target.value);

  const handleDelete = () => {
    console.log("Deleting", props);
  };

  useEffect(() => {
    console.log("Current Text", inputRef.current);
    inputRef.current.focus();
  }, []);

  const handleCreateFactNode = useCallback(
    (questionId) => {
      const questionNode = getNode(questionId);
      const newPosition = {
        x: 350,
        y: 0,
      };
      dispatch(
        addFact({
          parentId: questionId,
          position: newPosition,
        })
      );
      setCenter(
        questionNode.position.x + newPosition.x,
        questionNode.position.y + newPosition.y,
        {
          duration: 400,
          zoom: 2,
        }
      );
    },
    [getNode, setCenter, dispatch]
  );

  return (
    <Box>
      <Box
        display="flex"
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: "4px",
          padding: 1,
          display: "flex",
          alignItems: "center",
          backgroundColor: "background.default",
        }}
      >
        <NodeToolbar>
          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            size="small"
          >
            <Button onClick={() => handleCreateFactNode(props.id)}>
              Add Fact
            </Button>
            <Button onClick={() => handleCreateFactNode(props.id)}>
              Details
            </Button>
            <Button onClick={handleDelete}>Delete</Button>
          </ButtonGroup>
        </NodeToolbar>
        <Box
          sx={{
            borderRadius: "50%",
            mr: 1,
            py: 0.2,
            px: 0.7,
            backgroundColor: "grey.100",
          }}
        >
          <Typography variant="h6">{props.id}</Typography>
        </Box>
        <TextField
          inputRef={inputRef}
          id="text"
          name="text"
          onChange={onChange}
          size="small"
          sx={{ backgroundColor: "background.default", borderRadius: "4px" }}
          variant="standard"
          // InputProps={{ disableUnderline: true }}
        />
      </Box>
      <Handle id="top-target" type="target" position={Position.Top} />
      <Handle id="top-source" type="source" position={Position.Top} />
      <Handle id="bottom-target" type="target" position={Position.Bottom} />
      <Handle id="bottom-source" type="source" position={Position.Bottom} />
      <Handle id="left-target" type="target" position={Position.Left} />
      <Handle id="right-source" type="source" position={Position.Right} />
    </Box>
  );
}

export default memo(QuestionNode);
