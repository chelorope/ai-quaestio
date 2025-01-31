import { addEdge, useReactFlow } from "@xyflow/react";
import { useCallback } from "react";

export default function useConnectionRules() {
  const { getNode, setEdges } = useReactFlow();

  const onConnect = useCallback(
    (params) => {
      const sourceNode = getNode(params.source);
      const targetNode = getNode(params.target);

      console.log("handle onConnect", params, sourceNode, targetNode);

      // Connections rules
      if (
        (sourceNode.type === "fact" && targetNode.type === "question") ||
        (sourceNode.type === "question" && targetNode.type === "fact") ||
        sourceNode.id === targetNode.id ||
        (sourceNode.type === "question" &&
          targetNode.type === "question" &&
          params.sourceHandle === "right-source")
      ) {
        return;
      }

      if (sourceNode.type === "question" && targetNode.type === "question") {
        params.type = "questionDependency";
      }
      setEdges((eds) => addEdge(params, eds));
    },
    [getNode, setEdges]
  );

  return { onConnect };
}
