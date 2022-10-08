import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { chatReducer } from "./chat.slice";
import { userAuthApi } from "./queriesApi/backendAuth/user.api";
import { userApi } from "./userApi/user.api";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userAuthApi.reducerPath]: userAuthApi.reducer,
    chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(userAuthApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
