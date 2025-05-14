import React from "react";
import { useAppDispatch } from "@/redux/hooks";
import { updateDependencyEdgeType } from "@/redux/slices/designerSlice";
import {
  BaseEdge,
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
} from "@xyflow/react";
import { Button, ButtonGroup } from "@mui/material";
import { DependencyEdgeData } from "@/types/designer/Designer";

// Define the component props with proper types
type DependencyEdgeProps = EdgeProps & {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  selected: boolean;
  markerEnd: string;
  data: {
    type: DependencyEdgeData["type"];
  };
};

const DependencyEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  markerEnd,
  data,
}: DependencyEdgeProps) => {
  const dispatch = useAppDispatch();

  const handleTypeChange = (type: DependencyEdgeData["type"]) => {
    dispatch(updateDependencyEdgeType({ id, type }));
  };

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} />
      {selected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: "all",
              backgroundColor: "#fff",
              borderRadius: 5,
              padding: 3,
              fontSize: 12,
              fontWeight: 700,
            }}
            className="no-flow-tooltip"
          >
            <ButtonGroup size="small">
              <Button
                variant={data?.type === "full" ? "contained" : "outlined"}
                onClick={() => handleTypeChange("full")}
              >
                Full
              </Button>
              <Button
                variant={data?.type === "partial" ? "contained" : "outlined"}
                onClick={() => handleTypeChange("partial")}
              >
                Partial
              </Button>
            </ButtonGroup>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default DependencyEdge;
