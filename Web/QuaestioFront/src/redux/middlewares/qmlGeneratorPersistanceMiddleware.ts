import {
  setState,
  resetState,

  //Questions
  addQuestion,
  updateQuestionDescription,
  updateQuestionFacts,
  updateQuestionGuidelines,
  updateQuestionDependency,
  removeQuestion,
  setSelectedQuestion,

  // Facts
  addFact,
  updateFactDescription,
  updateFactGuidelines,
  updateFactMandatory,
  updateFactDefault,
  updateFactDependency,
  removeFact,
  setSelectedFact,

  // File details
  updateFileDetails,

  // Constraints
  updateConstraints,
  insertConstraints,
} from "../slices/qmlGeneratorSlice";
import { AppDispatch, RootState } from "../store";

import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";

// Create the middleware instance and methods
const qmlGeneratorPersistanceMiddleware = createListenerMiddleware();
const startAppListening =
  qmlGeneratorPersistanceMiddleware.startListening.withTypes<
    RootState,
    AppDispatch
  >();
// Add one or more listener entries that look for specific actions.
// They may contain any sync or async logic, similar to thunks.
startAppListening({
  matcher: isAnyOf(
    setState,
    resetState,

    //Questions
    addQuestion,
    updateQuestionDescription,
    updateQuestionFacts,
    updateQuestionGuidelines,
    updateQuestionDependency,
    removeQuestion,
    setSelectedQuestion,

    // Facts
    addFact,
    updateFactDescription,
    updateFactGuidelines,
    updateFactMandatory,
    updateFactDefault,
    updateFactDependency,
    removeFact,
    setSelectedFact,

    // File details
    updateFileDetails,

    // Constraints
    updateConstraints,
    insertConstraints
  ),
  effect: async (_action, listenerApi) => {
    const state = listenerApi.getState();
    localStorage.setItem("qmlGenerator", JSON.stringify(state.qmlGenerator));
  },
});

export default qmlGeneratorPersistanceMiddleware;
