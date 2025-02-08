"use client";
import { useCallback, useMemo } from "react";

import { Box } from "@mui/system";

import BaseDrawer from "./BaseDrawer";
import QuestionDetailsDrawer from "./QuestionDetailsDrawer";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeDrawer, selectDrawer } from "@/redux/slices/drawerSlice";

export default function Drawer() {
  const drawer = useAppSelector(selectDrawer);
  const dispatch = useAppDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeDrawer());
  }, [dispatch]);

  const { component, title } = useMemo(() => {
    switch (drawer.type) {
      case "question-details":
        return {
          title: "Question Details",
          component: (
            <QuestionDetailsDrawer
              questionId={drawer.data?.questionId}
              onClose={handleClose}
            />
          ),
        };
      default:
        return { component: <Box />, title: "" };
    }
  }, [drawer, handleClose]);

  return (
    <BaseDrawer
      open={drawer.open}
      position={drawer.position}
      header={title}
      onClose={handleClose}
    >
      {component}
    </BaseDrawer>
  );
}
