import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import questionnaireReducer from "./questionnaireSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    modal: modalReducer,
  },
});

setupListeners(store.dispatch);
