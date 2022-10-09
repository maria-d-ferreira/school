import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";

import { teacherApi } from "../apis/teacher.api";
import { studentApi } from "../apis/student.api";
import { authApi } from "../apis/auth.api";
import auth from "./auth.slice";

import CoursesSlice from "./courses.slice";
import UsersSlice from "./users.slice";

export const store = configureStore({
  reducer: {
    [teacherApi.reducerPath]: teacherApi.reducer,
    [studentApi.reducerPath]: studentApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    auth,
    courses: CoursesSlice.reducer,
    users: UsersSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(teacherApi.middleware)
      .concat(studentApi.middleware)
      .concat(authApi.middleware),
});

export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
