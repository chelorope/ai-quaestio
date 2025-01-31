import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";
import { useEffect, useState } from "react";

export default function QuestionDependencyEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
}) {
  const { setEdges } = useReactFlow();
  const [type, setType] = useState("full");
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  useEffect(() => {
    setEdges((es) =>
      es.map((e) => (e.id !== id ? e : { ...e, selected: true }))
    );
  }, [id, setEdges]);

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        {selected && (
          // <button
          //   style={{
          //     position: "absolute",
          //     transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
          //     pointerEvents: "all",
          //   }}
          //   className="nodrag nopan"
          //   onClick={() => {
          //     setEdges((es) => es.filter((e) => e.id !== id));
          //   }}
          // >
          //   delete
          // </button>
          <ToggleButtonGroup
            value={type}
            onChange={(event, newType) => setType(newType)}
            exclusive
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
            }}
            size="small"
          >
            <ToggleButton value="full">Full</ToggleButton>
            <ToggleButton value="partial">Partial</ToggleButton>
          </ToggleButtonGroup>
        )}
      </EdgeLabelRenderer>
    </>
  );
}
