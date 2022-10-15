import { SerializedError } from "@reduxjs/toolkit";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query";
import { AuthResponseDto } from "../store/queriesApi/backendAuth/user.types";

export const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:9000/",
});

const setUpdatedArgs = (args: FetchArgs, token: string): FetchArgs => ({
  ...args,
  headers: {
    ...(args as FetchArgs).headers,
    Authorization: `Bearer ${token}`,
  },
  credentials: "include",
});

export const baseQueryWithReAuth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const token = localStorage.getItem("token");
  const accessArgs: FetchArgs = setUpdatedArgs(args as FetchArgs, token);
  const refreshArgs: FetchArgs = {
    url: "/refresh",
    credentials: "include",
  };
  let result = await baseQuery(accessArgs, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(refreshArgs, api, extraOptions);
    const response: AuthResponseDto = refreshResult.data as AuthResponseDto;
    if (response) {
      localStorage.setItem("token", response.accessToken);
      const updatedCredentialsArgs: FetchArgs = setUpdatedArgs(
        args as FetchArgs,
        response.accessToken
      );
      result = await baseQuery(updatedCredentialsArgs, api, extraOptions);
    } else {
      throwNewError("Server error: Not working refresh api for token!!!");
    }
  }
  return result;
};

type RestQuery = "get" | "post";

interface RTKQConfig {
  headers: {};
  method: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  credentials?: RequestCredentials;
  url: string;
}

export const axiosQuery: Record<
  RestQuery,
  (url: string, body?: any) => RTKQConfig
> = {
  get: (url: string) => {
    return {
      headers: {
        "Accept-Content": "application/json",
      },
      credentials: "include",
      method: "GET",
      url,
    };
  },
  post: (url: string, body: any) => {
    return {
      headers: {
        "Accept-Content": "application/json",
      },
      credentials: "include",
      method: "POST",
      body,
      url,
    };
  },
};

type BackendError = { error: FetchBaseQueryError | SerializedError };

export type RTKQResponse<D> = { data: D } | BackendError;

export const isFailed = <D>(
  response: RTKQResponse<D>
): response is BackendError => {
  return "error" in response;
};

export const isSuccess = <D>(
  response: RTKQResponse<D>
): response is { data: D } => {
  return "data" in response;
};

export const throwNewError = (response: BackendError | string) => {
  if (typeof response === "string") {
    throw new Error(response);
  }
  const error = response.error;
  if ("data" in error) {
    const fetchError: FetchBaseQueryError = error;
    throw new Error(fetchError?.data as string);
  }
  if ("code" in error) {
    const serializedError: SerializedError = error;
    throw new Error(serializedError?.message);
  }
};
