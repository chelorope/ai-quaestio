import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import questionnaireReducer from "./questionnaireSlice";
import modalReducer from "./modalSlice";
import qmlGeneratorReducer from "./qmlGeneratorSlice";

export const store = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    modal: modalReducer,
    qmlGenerator: qmlGeneratorReducer,
  },
});

setupListeners(store.dispatch);
