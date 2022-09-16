import React, { useEffect } from "react";
import { useNavigate } from "react-router";
//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Routes from "./routes/routes";
import { useGetUserQuery } from "./apis/teacher.api";
import { useAppDispatch } from "./hooks/hooks";
import { setAuthState } from "./store/auth.slice";
import RequireAuth from "./components/auth/RequireAuth";
import { theme } from "../src/theme";

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
