import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { questionaireAPI } from "@/src/service";
import questionaireReducer from "./questionaireSlice";
import modalReducer from "./modalSlice";

export const store = configureStore({
  reducer: {
    questionaire: questionaireReducer,
    questionaireAPI: questionaireAPI.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(questionaireAPI.middleware),
});

setupListeners(store.dispatch);
