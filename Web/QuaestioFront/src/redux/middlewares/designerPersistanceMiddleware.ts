import {
  resetState,
  // Flow
  onNodesChange,
  onEdgesChange,
  onConnect,
  setEdges,
  updateDependencyEdgeType,
  // Questions,
  addQuestion,
  updateQuestionTitle,
  updateQuestionGuidelines,
  removeQuestion,
  // Facts
  addFact,
  updateFactTitle,
  updateFactGuidelines,
  updateFactMandatory,
  updateFactDefault,
  removeFact,
  // Questionaire
  updateConstraints,
} from "../slices/designerSlice";
import { AppDispatch, RootState } from "../store";

import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

// Create the middleware instance and methods
const desginerPersistanceMiddleware = createListenerMiddleware();
const startAppListening =
  desginerPersistanceMiddleware.startListening.withTypes<
    RootState,
    AppDispatch
  >();
// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
startAppListening({
  matcher: isAnyOf(
    resetState,
    // Flow
    onNodesChange,
    onEdgesChange,
    onConnect,
    setEdges,
    updateDependencyEdgeType,
    // Questions,
    addQuestion,
    updateQuestionTitle,
    updateQuestionGuidelines,
    removeQuestion,
    // Facts
    addFact,
    updateFactTitle,
    updateFactGuidelines,
    updateFactMandatory,
    updateFactDefault,
    removeFact,
    // Questionaire
    updateConstraints
  ),
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState();
    localStorage.setItem("flow", JSON.stringify(state.designer));
  },
});

export default desginerPersistanceMiddleware;
