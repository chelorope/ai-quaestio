import { useAppDispatch } from "@/redux/hooks";
import { updateDependencyEdgeType } from "@/redux/slices/designerSlice";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  BaseEdge,
  EdgeLabelRenderer,
  getSimpleBezierPath,
} from "@xyflow/react";

const DEFAULT_MARKER_END = "url('#outlined-marker')";

export default function DependencyEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  markerEnd,
  data,
}) {
  const dispatch = useAppDispatch();
  const [edgePath, labelX, labelY] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleTypeChange = (type) => {
    if (type !== null) {
      dispatch(updateDependencyEdgeType({ id, type }));
    }
  };

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd || DEFAULT_MARKER_END}
        style={{
          strokeDasharray: data?.type === "full" ? "none" : 5,
          strokeWidth: selected ? 3 : 2,
        }}
      />
      <EdgeLabelRenderer>
        {selected && (
          <ToggleButtonGroup
            value={data?.type}
            onChange={(_, newType) => handleTypeChange(newType)}
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
      <svg className="react-flow__marker">
        <defs>
          <marker
            className="react-flow__arrowhead"
            id="filled-marker"
            markerWidth="20"
            markerHeight="20"
            viewBox="-10 -10 20 20"
            markerUnits="strokeWidth"
            orient="auto-start-reverse"
            refX="0"
            refY="0"
          >
            <polyline
              strokeLinecap="round"
              strokeLinejoin="round"
              points="-5,-4 0,0 -5,4 -5,-4"
              style={{
                stroke: "var(--xy-edge-stroke-default)",
                fill: "var(--xy-edge-stroke-default)",
                strokeWidth: 2,
              }}
            ></polyline>
          </marker>
          <marker
            className="react-flow__arrowhead"
            id="outlined-marker"
            markerWidth="20"
            markerHeight="20"
            viewBox="-10 -10 20 20"
            markerUnits="strokeWidth"
            orient="auto-start-reverse"
            refX="0"
            refY="0"
          >
            <polyline
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              points="-5,-4 0,0 -5,4"
              style={{ stroke: "rgb(177, 177, 183)", strokeWidth: 1 }}
            ></polyline>
          </marker>
        </defs>
      </svg>
    </>
  );
}
