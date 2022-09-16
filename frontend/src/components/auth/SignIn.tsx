import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { User } from "../../schemas/User";
import { useAppDispatch } from "../../hooks/hooks";
import { setAuthState } from "../../store/auth.slice";
import { useLoginMutation } from "../../apis/auth.api";
import { store } from "../../store/store";

const SignIn: React.FC = () => {
  const [signin] = useLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  // const from = location.state?.from?.pathname;

  const dispatch = useAppDispatch();

  const [err, setErr] = useState(null);

  const errorDiv = err ? (
    <div className="error" style={{ color: "#E3A15A" }}>
      <i className="material-icons error-icon">{err}</i>
    </div>
  ) : (
    ""
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErr(null);

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email").toString();
    const password = formData.get("password").toString();

    const response = (await signin({ email, password })) as { data: User };
    await signin({ email, password })
      .unwrap()
      .then(() => {
        dispatch(setAuthState({ user: response.data }));
        const user = store.getState().auth.user;
        if (user.role === "admin") navigate("/a/menu");
        if (user.role === "teacher") navigate("/t/menu");
        if (user.role === "student") navigate("/s/menu");
      })
      .catch(error => {
        setErr(error.data.message);
      });
  };

  return (
    <>
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
          <Typography component="h1" variant="h4" marginBottom={2}>
            start:school
          </Typography>
          <Avatar sx={{ m: 1 }}></Avatar>
          <Typography component="h1" variant="h6">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              type="email"
              fullWidth
              id="email"
              label="Email"
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
            <Grid item xs={12}>
              {errorDiv}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  <Link to="/signup">Register as a Teacher</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default SignIn;
