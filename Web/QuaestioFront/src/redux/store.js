import { configureStore } from "@reduxjs/toolkit";
import { createPersistStorage } from "@/redux/persist-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import questionnaireReducer from "./slices/questionnaireSlice";
import modalReducer from "./slices/modalSlice";
import qmlGeneratorReducer from "./slices/qmlGeneratorSlice";

const persistConfig = {
  key: "root",
  storage: createPersistStorage(),
};

const persistedReducer = persistReducer(persistConfig, qmlGeneratorReducer);

export const makeStore = () =>
  configureStore({
    reducer: {
      questionnaire: questionnaireReducer,
      modal: modalReducer,
      qmlGenerator: persistedReducer,
    },
    middleware: (getDefaultMiddleware) =>
      // Required for react-persist
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });

export const makePersistor = (store) => persistStore(store);
