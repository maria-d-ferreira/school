import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { User } from "../../schemas/User";
import { useAppDispatch } from "../../app/hooks";
import { setAuthState } from "../../slices/auth.slice";
import { useLoginMutation } from "../../apis/auth.api";

const theme = createTheme();

const SignIn: React.FC = () => {
  const [signin] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").toString();
    const password = formData.get("password").toString();
    try {
      const response = (await signin({ email, password })) as { data: User };
      dispatch(setAuthState({ user: response.data }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                type="email"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                type="password"
                fullWidth
                name="password"
                label="Password"
                id="password"
                autoComplete="current-password"
              />
              <Typography component="p" color="red">
                {/* {errror} */}
              </Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Typography variant="body2">
                    <Link to="/signup">Don't have an account? Sign Up</Link>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default SignIn;
