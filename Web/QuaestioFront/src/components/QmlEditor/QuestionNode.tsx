import React, { memo, useCallback, useEffect, useRef } from "react";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  addFact,
  removeQuestion,
  updateQuestionTitle,
} from "@/redux/slices/flowSlice";
import { openDrawer } from "@/redux/slices/drawerSlice";
import BaseNode from "./BaseNode";

export type QuestionNode = Node<
  {
    title: string;
    description: string;
  },
  "question"
>;

function QuestionNode(props: NodeProps<QuestionNode>) {
  const inputRef = useRef<HTMLInputElement>();
  const dispatch = useDispatch();

  const { getNode, setCenter } = useReactFlow();

  const handleChange = (value: string) => {
    dispatch(updateQuestionTitle({ title: value, id: props.id }));
  };

  const handleDelete = () => {
    dispatch(removeQuestion(props.id));
    console.log("Deleting", props);
  };

  useEffect(() => {
    console.log("Current Text", inputRef.current);
    inputRef.current?.focus();
  }, []);

  const handleCreateFactNode = useCallback(
    (questionId) => {
      const questionNode = getNode(questionId);
      const newPosition = {
        x: 350,
        y: 0,
      };
      dispatch(
        addFact({
          parentId: questionId,
          position: newPosition,
        })
      );
      setCenter(
        (questionNode?.position?.x || 0) + newPosition.x,
        (questionNode?.position?.y || 0) + newPosition.y,
        {
          duration: 400,
          zoom: 1,
        }
      );
    },
    [getNode, setCenter, dispatch]
  );

  return (
    <BaseNode
      id={props.id}
      value={props.data?.title}
      backgroundColor="#ffffcc"
      toolbarButtons={[
        <Button key={0} onClick={() => handleCreateFactNode(props.id)}>
          Add Fact
        </Button>,
        <Button
          key={1}
          onClick={() =>
            dispatch(
              openDrawer({
                type: "question-details",
                data: { questionId: props.id },
              })
            )
          }
        >
          Details
        </Button>,
        <Button key={2} onClick={handleDelete}>
          Delete
        </Button>,
      ]}
      onChange={handleChange}
    />
  );
}

export default memo(QuestionNode);
