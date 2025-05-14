import { configureStore } from "@reduxjs/toolkit";

import questionnaireReducer from "./slices/questionnaireSlice";
import modalReducer from "./slices/modalSlice";
import designerReducer from "./slices/designerSlice";
import drawerReducer from "./slices/drawerSlice";
import designerPersistanceMiddleware from "./middlewares/designerPersistanceMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      questionnaire: questionnaireReducer,
      modal: modalReducer,
      designer: designerReducer,
      drawer: drawerReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(designerPersistanceMiddleware.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
