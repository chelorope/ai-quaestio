import { configureStore } from "@reduxjs/toolkit";

import questionnaireReducer from "./slices/questionnaireSlice";
import modalReducer from "./slices/modalSlice";
import flowReducer from "./slices/flowSlice";
import drawerReducer from "./slices/drawerSlice";
import qmlGeneratorReducer from "./slices/qmlGeneratorSlice";
import qmlGeneratorPersistanceMiddleware from "./middlewares/qmlGeneratorPersistanceMiddleware";
import flowPersistanceMiddleware from "./middlewares/flowPersistanceMiddleware";

export const makeStore = () => {
  return configureStore({
    reducer: {
      questionnaire: questionnaireReducer,
      modal: modalReducer,
      qmlGenerator: qmlGeneratorReducer,
      flow: flowReducer,
      drawer: drawerReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .prepend(qmlGeneratorPersistanceMiddleware.middleware)
        .prepend(flowPersistanceMiddleware.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
