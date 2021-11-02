import { configureStore } from "@reduxjs/toolkit";
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
import storage from "./fallbackStorage";
import navSlices from "./reducers/navSlices";
import projectSlices from "./reducers/projectSlices";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persisted = persistReducer(persistConfig, navSlices);

const store = configureStore({
  reducer: {
    nav: persisted,
    projects: projectSlices,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
export let persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
