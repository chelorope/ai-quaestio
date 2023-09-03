import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import questionaireReducer from "./questionaireSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    questionaire: questionaireReducer,
    modal: modalReducer,
  },
});

setupListeners(store.dispatch);
