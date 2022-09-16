import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { CreateUserRequest } from "../dto/create-user-request.dto";
import { User } from "../schemas/User";

export const studentApi = createApi({
  reducerPath: "usersApi",

  // baseQuery: fetchBaseQuery({
  //   baseUrl: "https://school-backend-e1jhkszow-maria-ferreira.vercel.app/users",
  // }),

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL + "/users",
    mode: "cors",
  }),

  endpoints: build => ({
    createUser: build.mutation<User, CreateUserRequest>({
      query: createUserRequest => ({
        url: "/signup/student",
        method: "POST",
        body: createUserRequest,
      }),
    }),
    getUser: build.query<User, undefined>({
      query: () => ({ url: "/ " }),
    }),
  }),
});

export const { useCreateUserMutation, useGetUserQuery } = studentApi;
