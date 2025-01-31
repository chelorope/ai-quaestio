"use client";
import FactNode from "@/components/QmlEditor/FactNode";
import QuestionDependencyEdge from "@/components/QmlEditor/QuestionDependencyEdge";
import QuestionNode from "@/components/QmlEditor/QuestionNode";
import {
  addQuestion,
  onConnect,
  onEdgesChange,
  onNodesChange,
  selectEdges,
  selectNodes,
  selectQuestions,
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

const nodeTypes = { question: QuestionNode, fact: FactNode };
const edgeTypes = { questionDependency: QuestionDependencyEdge };

const EditorLayout = () => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const edges = useSelector(selectEdges);
  const questionNodes = useSelector(selectQuestions);
  const nodes = useSelector(selectNodes);

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
        colorMode={theme.palette.mode}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={(e) => dispatch(onNodesChange(e))}
        onEdgesChange={(e) => dispatch(onEdgesChange(e))}
        onConnect={(e) => dispatch(onConnect(e))}
        fitView
      >
        <Panel position="top-left">
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={handleCreateQuestionNode}>Add Question</Button>
            <Button>Constraints</Button>
            <Button>Export</Button>
          </ButtonGroup>
        </Panel>
        <Background
          color="#888"
          gap={16}
          size={1}
          variant={BackgroundVariant.Dots}
        />
        <Controls />
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
