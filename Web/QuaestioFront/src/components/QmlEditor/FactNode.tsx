import React, { memo } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeFact, updateFactTitle } from "@/redux/slices/flowSlice";
import BaseNode, { BaseHandle } from "./BaseNode";
import { openDrawer } from "@/redux/slices/drawerSlice";
import { Node } from "@xyflow/react";

export type FactNode = Node<
  {
    title: string;
    description: string;
    default: boolean;
    mandatory: boolean;
    targetHandles: BaseHandle[];
    sourceHandles: BaseHandle[];
  },
  "fact"
>;

function FactNode(props: FactNode) {
  const dispatch = useDispatch();
  const handleChange = (value) => {
    dispatch(updateFactTitle({ id: props.id, title: value }));
  };

  const handleFactDetails = () => {
    dispatch(openDrawer({ type: "fact-details", data: { factId: props.id } }));
  };

  const handleDeleteFact = () => {
    dispatch(removeFact(props.id));
  };

  return (
    <BaseNode
      id={props.id}
      value={props.data?.title}
      mandatory={props.data?.mandatory}
      defaultTrue={props.data?.default}
      targetHandles={props.data?.targetHandles}
      sourceHandles={props.data?.sourceHandles}
      backgroundColor="#c7ceab"
      toolbarButtons={[
        <Button key={0} onClick={handleFactDetails}>
          Details
        </Button>,
        <Button key={1} onClick={handleDeleteFact}>
          Delete
        </Button>,
      ]}
      onChange={handleChange}
    />
  );
}

export default memo(FactNode);
