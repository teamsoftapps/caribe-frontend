import {
  configureStore,
  getDefaultMiddleware,
  applyMiddleware,
} from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";
import storage from "redux-persist/lib/storage";

import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"],
  stateReconciler: autoMergeLevel2,
};
const RootReducer = (state, action) => {
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
