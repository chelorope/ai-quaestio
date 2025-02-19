import React, { memo, useCallback, useEffect, useRef } from "react";
import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { Button } from "@mui/material";
import {
  addFact,
  removeQuestion,
  selectQuestionFacts,
  updateQuestionTitle,
} from "@/redux/slices/flowSlice";
import { openDrawer } from "@/redux/slices/drawerSlice";
import BaseNode from "./BaseNode";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export type QuestionNode = Node<
  {
    title: string;
    description: string;
  },
  "question"
>;

function QuestionNode(props: NodeProps<QuestionNode>) {
  const inputRef = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();
  const questionFacts = useAppSelector(selectQuestionFacts(props.id));

  const { setCenter } = useReactFlow();

  const handleChange = (value: string) => {
    dispatch(updateQuestionTitle({ title: value, id: props.id }));
  };

  const handleDelete = () => {
    dispatch(removeQuestion(props.id));
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCreateFactNode = useCallback(
    (questionId) => {
      const lastSibling = questionFacts[questionFacts.length - 1];

      const newPosition = lastSibling
        ? {
            x: lastSibling?.position?.x,
            y: lastSibling?.position?.y + 100,
          }
        : { x: 350, y: 0 };
      dispatch(
        addFact({
          parentId: questionId,
          position: newPosition,
        })
      );
      setCenter(
        newPosition.x + props.positionAbsoluteX,
        newPosition.y + props.positionAbsoluteY,
        {
          duration: 400,
          zoom: 1,
        }
      );
    },
    [
      setCenter,
      dispatch,
      questionFacts,
      props.positionAbsoluteX,
      props.positionAbsoluteY,
    ]
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
