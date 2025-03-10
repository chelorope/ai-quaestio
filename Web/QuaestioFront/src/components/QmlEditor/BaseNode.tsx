import React, { memo, useEffect, useRef } from "react";
import { Handle, NodeToolbar, Position } from "@xyflow/react";
import { Avatar, Box, ButtonGroup, TextField, Typography } from "@mui/material";

export type BaseHandle = {
  id: string;
  position: Position;
};
interface BaseNodeProps {
  id: string;
  value: string;
  toolbarButtons: React.ReactNode;
  mandatory?: boolean;
  defaultTrue?: boolean;
  backgroundColor?: string;
  onChange: (value: string) => void;
  targetHandles?: BaseHandle[];
  sourceHandles?: BaseHandle[];
}

function BaseNode(props: BaseNodeProps) {
  const inputRef = useRef<HTMLInputElement>();

  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  console.log("Handles", props.targetHandles, props.sourceHandles);
  return (
    <Box
      display="flex"
      sx={{
        border: 1,
        borderColor: "divider",
        borderRadius: "4px",
        padding: 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: props.backgroundColor, //"background.default",
      }}
    >
      <NodeToolbar>
        <ButtonGroup
          variant="outlined"
          aria-label="Basic button group"
          size="small"
        >
          {props.toolbarButtons}
        </ButtonGroup>
      </NodeToolbar>
      <Box
        sx={{
          borderRadius: "50%",
          mr: 1,
          py: 0.2,
          px: 0.7,
          backgroundColor: "grey.100",
          color: "grey.800",
        }}
      >
        <Typography variant="h6">{props.id}</Typography>
      </Box>
      <TextField
        inputRef={inputRef}
        id="text"
        name="text"
        value={props.value || ""}
        onChange={handleChange}
        size="small"
        sx={{
          borderRadius: "4px",
          ".MuiInputBase-input": { color: "grey.800" },
        }}
        variant="standard"
        InputProps={{ disableUnderline: true }}
      />
      <Box display="flex" ml={2}>
        {props.defaultTrue && (
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
        )}
        {props.mandatory && (
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
        )}
      </Box>
      {props.targetHandles?.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type="target"
          position={handle.position}
        />
      ))}
      {props.sourceHandles?.map((handle) => (
        <Handle
          key={handle.id}
          id={handle.id}
          type="source"
          position={handle.position}
        />
      ))}
      {/* <Handle id="top-target" type="target" position={Position.Top} />
      <Handle id="top-source" type="source" position={Position.Top} />
      <Handle id="bottom-target" type="target" position={Position.Bottom} />
      <Handle id="bottom-source" type="source" position={Position.Bottom} />
      <Handle id="left-target" type="target" position={Position.Left} />
      <Handle id="left-source" type="source" position={Position.Left} />
      <Handle id="right-target" type="target" position={Position.Right} />
      <Handle id="right-source" type="source" position={Position.Right} /> */}
    </Box>
  );
}

export default memo(BaseNode);
