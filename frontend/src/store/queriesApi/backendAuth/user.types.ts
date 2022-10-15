import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";

export const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:9000/" });

export interface UserAuth {
  email: string;
  password: string;
}

export interface UserDto {
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
}

export interface AuthResponseDto {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
}
