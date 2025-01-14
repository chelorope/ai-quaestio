"use client";
import FactNode from "@/components/QmlEditor/FactNode";
import QuestionNode from "@/components/QmlEditor/QuestionNode";
import { useTheme } from "@emotion/react";
import { Button, ButtonGroup } from "@mui/material";
import Container from "@mui/material/Container";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Panel,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";
import { useCallback, useState } from "react";

const initialNodes = [
  {
    id: "1",
    position: { x: 0, y: 0 },
    data: { label: "1" },
    type: "question",
  },
  {
    id: "2",
    position: { x: 250, y: 0 },
    data: { label: "2" },
    type: "question",
  },
  {
    id: "3",
    position: { x: 500, y: 0 },
    data: { label: "3" },
    type: "question",
  },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2", animated: true }];

const nodeTypes = { question: QuestionNode, fact: FactNode };

const EditorLayout = () => {
  const theme = useTheme();
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const { setCenter } = useReactFlow();

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const handleCreateQuestionNode = useCallback(() => {
    const id = String(nodes.length + 1);
    const newPosition = { ...nodes[nodes.length - 1].position };
    newPosition.y += 100;
    setNodes((nds) => [
      ...nds,
      {
        id,
        position: newPosition,
        data: { label: id },
        type: "question",
      },
    ]);
    setCenter(newPosition.x, newPosition.y, { duration: 400 });
  }, [nodes, setCenter]);

  // const handleCreateFactNode = useCallback(
  //   (questionId) => {
  //     const id = String(nodes.length + 1);
  //     const newPosition = { ...nodes[nodes.length - 1].position };
  //     newPosition.y += 100;
  //     setNodes((nds) => [
  //       ...nds,
  //       {
  //         id,
  //         position: newPosition,
  //         data: { label: id },
  //         type: "fact",
  //       },
  //     ]);
  //     setCenter(newPosition.x, newPosition.y, { duration: 400 });
  //   },
  //   [nodes, setCenter]
  // );

  return (
    <Container sx={{ my: "auto", p: 5, height: 1, width: 1 }}>
      <ReactFlow
        colorMode={theme.palette.mode}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Panel position="top-left">
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={handleCreateQuestionNode}>Add Question</Button>
            <Button>Two</Button>
            <Button>Three</Button>
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
    </Container>
  );
};

export default function Editor() {
  return (
    <ReactFlowProvider>
      <EditorLayout />
    </ReactFlowProvider>
  );
}
