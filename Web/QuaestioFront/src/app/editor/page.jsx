"use client";
import FactNode from "@/components/QmlEditor/FactNode";
import DependencyEdge from "@/components/QmlEditor/DependencyEdge";
import QuestionNode from "@/components/QmlEditor/QuestionNode";
import {
  addQuestion,
  onConnect,
  onEdgesChange,
  onNodesChange,
  onViewportChange,
  selectEdges,
  selectNodes,
  selectQuestions,
  selectViewport,
} from "@/redux/slices/flowSlice";
import { useTheme } from "@emotion/react";
import { Box, Button, ButtonGroup } from "@mui/material";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "@/redux/slices/drawerSlice";
import Legend from "@/components/QmlEditor/Legend";

const nodeTypes = { question: QuestionNode, fact: FactNode };
const edgeTypes = { dependency: DependencyEdge };

const EditorLayout = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const viewport = useSelector(selectViewport);
  const edges = useSelector(selectEdges);
  const nodes = useSelector(selectNodes);
  const questionNodes = useSelector(selectQuestions);

  const { setCenter } = useReactFlow();

  const handleCreateQuestionNode = useCallback(() => {
    const newPosition = {
      ...(questionNodes[questionNodes.length - 1]?.position || { x: 0, y: 0 }),
    };
    newPosition.y += 100;
    dispatch(
      addQuestion({
        position: newPosition,
        // selected: true,
      })
    );
    setCenter(newPosition.x, newPosition.y, { duration: 400, zoom: 1 });
  }, [setCenter, questionNodes, dispatch]);

  const handleConstraintsDrawer = useCallback(() => {
    dispatch(openDrawer({ type: "constraints" }));
  }, [dispatch]);

  const handleExportDrawer = useCallback(() => {
    dispatch(openDrawer({ type: "export" }));
  }, [dispatch]);

  return (
    <Box
      sx={{
        my: "auto",
        p: 1,
        height: 1,
        width: 1,
        backgroundColor: "background.default",
      }}
    >
      <ReactFlow
        viewport={viewport}
        colorMode={theme.palette.mode}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(e) => dispatch(onNodesChange(e))}
        onEdgesChange={(e) => dispatch(onEdgesChange(e))}
        onConnect={(e) => dispatch(onConnect(e))}
        onViewportChange={(e) => dispatch(onViewportChange(e))}
        fitView
        snapToGrid={true}
      >
        <Panel position="top-left">
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={handleCreateQuestionNode}>Add Question</Button>
            <Button onClick={handleConstraintsDrawer}>Constraints</Button>
            <Button onClick={handleExportDrawer}>Export</Button>
          </ButtonGroup>
        </Panel>
        <Panel position="bottom-left">
          <Legend />
        </Panel>
        <Background
          color="#888"
          gap={16}
          size={1}
          variant={BackgroundVariant.Dots}
        />
        <Controls orientation="horizontal" style={{ marginBottom: "160px" }} />
      </ReactFlow>
    </Box>
  );
};

export default function Editor() {
  return (
    <ReactFlowProvider>
      <EditorLayout />
    </ReactFlowProvider>
  );
}
