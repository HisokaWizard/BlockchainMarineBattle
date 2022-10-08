import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, UserAuth, UserDto } from "./user.types";

// type UserApiUrls = "registration" | "login" | "users" | "logout";

export const userAuthApi = createApi({
  reducerPath: "userAuthApi",
  baseQuery,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    registration: builder.mutation<any, UserAuth>({
      query: (data) => ({
        url: "registration",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    login: builder.mutation<any, UserAuth>({
      query: (data) => ({
        url: "login",
        method: "POST",
        body: data,
        headers: { "Content-Type": "application/json" },
      }),
    }),
    users: builder.query<void, UserDto>({
      query: () => ({
        url: "users",
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "logout",
        method: "POST",
        headers: { "Content-Type": "application/json" },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useUsersQuery } =
  userAuthApi;
