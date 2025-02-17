"use client";
import { useCallback, useMemo } from "react";

import { Box } from "@mui/system";

import BaseDrawer from "./BaseDrawer";
import QuestionDetailsDrawer from "./QuestionDetailsDrawer";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeDrawer, selectDrawer } from "@/redux/slices/drawerSlice";
import FactDetailsDrawer from "./FactDetailsDrawer";
import ConstraintsDrawer from "./ConstraintsDrawer";
import ExportDrawer from "./ExportDrawer";

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
      case "fact-details":
        return {
          title: "Fact Details",
          component: <FactDetailsDrawer factId={drawer.data?.factId} />,
        };
      case "constraints":
        return {
          title: "Constraints",
          component: <ConstraintsDrawer />,
        };
      case "export":
        return {
          title: "Export",
          component: <ExportDrawer />,
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
