import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { createLogger } from "redux-logger";
import { Middleware, configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./slices/user/user.slice";

export * from "./slices/user/user.slice";

const middlewares: Middleware[] = [];
const logger = createLogger();
middlewares.push(logger);

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(middlewares),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
export default store;
