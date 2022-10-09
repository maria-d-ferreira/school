import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Routes from "./routes/routes";
import { useGetUserQuery } from "./apis/teacher.api";
import { useAppDispatch } from "./hooks/hooks";
import { setAuthState } from "./store/auth.slice";
import RequireAuth from "./components/auth/RequireAuth";
import { theme } from "../src/theme";
import { useFetch } from "./hooks/useFetch";
import { coursesActions } from "./store/courses.slice";
import { usersActions } from "./store/users.slice";
import { store } from "./store/store";

function App() {
  const { data: user } = useGetUserQuery(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      dispatch(setAuthState({ user }));
      navigate("/");
    }
  }, [user, dispatch, navigate]);

  let url = process.env.REACT_APP_BASE_URL + "/courses/courses";
  const { data: courses } = useFetch(url);
  url = process.env.REACT_APP_BASE_URL + "/users/users";
  const { data: users } = useFetch(url);

  useEffect(() => {
    dispatch(coursesActions.getCourses(courses));
    dispatch(usersActions.getUsers(users));
  }, [courses, users, dispatch]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes></Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
