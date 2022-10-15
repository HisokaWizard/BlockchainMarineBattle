import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosQuery } from "../../../utils";
import { AuthResponseDto, baseQuery, UserAuth } from "./user.types";

// type UserApiUrls = "registration" | "login" | "users" | "logout";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery,
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    registration: builder.mutation<AuthResponseDto, UserAuth>({
      query: (data) => axiosQuery.post("registration", data),
    }),
    login: builder.mutation<AuthResponseDto, UserAuth>({
      query: (data) => axiosQuery.post("login", data),
    }),
    logout: builder.mutation<void, void>({
      query: (data) => axiosQuery.post("logout", data),
    }),
  }),
});

export const { useLoginMutation, useRegistrationMutation, useLogoutMutation } =
  authApi;
