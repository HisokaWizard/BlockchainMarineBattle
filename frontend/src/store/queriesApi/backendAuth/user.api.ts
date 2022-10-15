import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosQuery, baseQueryWithReAuth } from "../../../utils";
import { UserDto } from "./user.types";

export const userServiceApi = createApi({
  reducerPath: "userServiceApi",
  baseQuery: baseQueryWithReAuth,
  tagTypes: ["user"],
  endpoints: (builder) => ({
    users: builder.query<UserDto[], void>({
      query: () => axiosQuery.get("users"),
    }),
  }),
});

export const { useUsersQuery, useLazyUsersQuery } = userServiceApi;
