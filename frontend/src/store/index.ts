import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { chatReducer } from "./chat.slice";
import { authApi } from "./queriesApi/backendAuth/auth.api";
import { userServiceApi } from "./queriesApi/backendAuth/user.api";
import { userApi } from "./userApi/user.api";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [userServiceApi.reducerPath]: userServiceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(userServiceApi.middleware)
      .concat(authApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
