import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { teacherApi } from "../apis/teacher.api";
import { studentApi } from "../apis/student.api";
import { authApi } from "../apis/auth.api";
import auth from "./auth.slice";


export const store = configureStore({
  reducer: {
    [teacherApi.reducerPath]: teacherApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,

    [authApi.reducerPath]: authApi.reducer,
    auth,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(teacherApi.middleware)
      .concat(studentApi.middleware)
      .concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
