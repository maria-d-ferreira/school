import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SignInRequest } from "../dto/signin-request.dto";
import { User } from "../schemas/User";

export const authApi = createApi({
  reducerPath: "authApi",

  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://school-backend-e1jhkszow-maria-ferreira.vercel.app/auth",
  // }),
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + "/auth",
  }),

  endpoints: build => ({
    login: build.mutation<User, SignInRequest>({
      query: signInRequest => ({
        url: "/signin",
        method: "POST",
        body: signInRequest,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
