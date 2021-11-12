import { createStore, applyMiddleware, combineReducers } from "redux";
import type { Middleware, Store, EmptyObject, AnyAction } from "redux";
import { createWrapper } from "next-redux-wrapper";
import { persistStore, persistReducer } from "redux-persist";
import thunkMiddleware from "redux-thunk";
import navSlices, { NavStates } from "./reducers/navSlices";
import projectSlices, { ProjectStates } from "./reducers/projectSlices";
import storage from "./fallbackStorage";
import type { PersistPartial } from "redux-persist/es/persistReducer";
import type { Persistor } from "redux-persist/lib/types";
// If you don't bother about the error redux-persist failed to create sync storage. falling back to noop storage...uncomment the next line and comment out the previous import. See more on - https://github.com/vercel/next.js/discussions/15687
// const storage = require('redux-persist/lib/storage').default;

//COMBINING ALL REDUCERS
const combinedReducer = combineReducers({
  nav: navSlices,
  projects: projectSlices,
  // OTHER REDUCERS WILL BE ADDED HERE
});

const bindMiddleware = (middleware: Middleware[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = () => {
  //If it's on client side, create a store which will persist

  const persistConfig = {
    key: "nextjs",
    whitelist: ["nav"], // only navSlices will be persisted, add other reducers if needed
    storage, // if needed, use a safer storage
  };

  const persistedReducer = persistReducer(persistConfig, combinedReducer); // Create a new reducer with our existing reducer

  const store: Store<
    EmptyObject & { nav: NavStates; projects: ProjectStates } & PersistPartial,
    AnyAction
  > & { __persistor: Persistor } = createStore(
    persistedReducer,
    bindMiddleware([thunkMiddleware])
  ); // Creating the store again

  store.__persistor = persistStore(store); // This creates a persistor object & push that persisted object to .__persistor, so that we can avail the persistability feature
  return store;
};

const storeType = makeStore();

// Export the wrapper & wrap the pages/_app.js with this wrapper only
export type RootState = ReturnType<typeof storeType.getState>;
export type AppDispatch = typeof storeType.dispatch;
export const wrapper = createWrapper(makeStore);
