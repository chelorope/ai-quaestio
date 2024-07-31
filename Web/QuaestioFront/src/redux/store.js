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

export const store = configureStore({
  reducer: {
    questionnaire: questionnaireReducer,
    modal: modalReducer,
    qmlGenerator: persistedReducer,
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, (state) => {
      persistConfig.storage.removeItem(`persist:${persistConfig.key}`);
    });
  },
  middleware: (getDefaultMiddleware) =>
    // Required for react-persist
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
