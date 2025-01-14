import React, { memo } from "react";
import { Handle, NodeToolbar, Position } from "@xyflow/react";
import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";

const onConnect = (params) => console.log("handle onConnect", params);

function QuestionNode(props) {
  console.log(props.id);
  const onChange = (event) => console.log("text changed", event.target.value);
  return (
    <Box>
      <Box
        display="flex"
        sx={{
          border: 1,
          borderColor: "divider",
          borderRadius: "4px",
        }}
      >
        <NodeToolbar
          isVisible={props.data.toolbarVisible}
          position={props.data.toolbarPosition}
        >
          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            size="small"
          >
            <Button>Add Fact</Button>
            <Button>Delete</Button>
          </ButtonGroup>
        </NodeToolbar>
        <Typography variant="h6">{props.id}</Typography>
        <TextField
          id="text"
          name="text"
          onChange={onChange}
          size="small"
          sx={{ backgroundColor: "background.default" }}
          variant="standard"
          InputProps={{ disableUnderline: true }}
        />
      </Box>
      <Handle type="target" position={Position.Left} onConnect={onConnect} />
      <Handle type="source" position={Position.Right} />
    </Box>
  );
}

export default memo(QuestionNode);
