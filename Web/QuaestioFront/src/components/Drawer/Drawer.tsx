"use client";
import { useCallback, useMemo } from "react";

import { Box } from "@mui/system";

import BaseDrawer from "./BaseDrawer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { closeDrawer, selectDrawer } from "@/redux/slices/drawerSlice";
import QuestionDetailsDrawer from "./QuestionDetailsDrawer";
import FactDetailsDrawer from "./FactDetailsDrawer";
import ConstraintsDrawer from "./ConstraintsDrawer";
import { ExportDrawer } from "./ExportDrawer";

export default function Drawer() {
  const dispatch = useAppDispatch();
  const drawer = useAppSelector(selectDrawer);

  const handleClose = useCallback(() => {
    dispatch(closeDrawer());
  }, [dispatch]);

  const content = useMemo(() => {
    if (!drawer) return null;

    switch (drawer.type) {
      case "question-details": {
        if (!drawer.data?.questionId) {
          return null;
        }
        return {
          title: "Question Details",
          onClose: handleClose,
          component: (
            <QuestionDetailsDrawer questionId={drawer.data?.questionId} />
          ),
        };
      }
      case "fact-details": {
        if (!drawer.data?.factId) {
          return null;
        }
        return {
          title: "Fact Details",
          onClose: handleClose,
          component: <FactDetailsDrawer factId={drawer.data?.factId} />,
        };
      }
      case "constraints": {
        return {
          title: "Edit Constraints",
          onClose: handleClose,
          component: <ConstraintsDrawer />,
        };
      }
      case "export": {
        return {
          title: "Export QML",
          onClose: handleClose,
          component: <ExportDrawer />,
        };
      }
      default:
        return null;
    }
  }, [drawer, handleClose]);

  return drawer && content ? (
    <BaseDrawer
      open={drawer.open}
      position={drawer.position}
      title={content.title}
      handleClose={content.onClose}
    >
      <Box sx={{ p: 2 }}>{content.component}</Box>
    </BaseDrawer>
  ) : null;
}
