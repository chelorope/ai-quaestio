import React, { memo } from "react";
import { Handle, NodeToolbar, Position } from "@xyflow/react";
import { Box, Button, ButtonGroup, TextField, Typography } from "@mui/material";

function TextNode(props) {
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
          isVisible={props.data?.toolbarVisible}
          position={props.data?.toolbarPosition}
        >
          <ButtonGroup
            variant="outlined"
            aria-label="Basic button group"
            size="small"
          >
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
      <Handle id="left-target" type="target" position={Position.Left} />
      <Handle id="top-target" type="target" position={Position.Top} />
      <Handle id="top-source" type="source" position={Position.Top} />
      <Handle id="rigt-target" type="target" position={Position.Right} />
      <Handle id="right-source" type="source" position={Position.Right} />
      <Handle id="bottom-source" type="target" position={Position.Bottom} />
      <Handle id="bottom-source" type="source" position={Position.Bottom} />
    </Box>
  );
}

export default memo(TextNode);
