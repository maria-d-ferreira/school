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
import { useCreateUserMutation } from "../../apis/users.api";

const theme = createTheme();

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const [err, setErr] = useState(null);

  const errorDiv = err ? (
    <div className="error" style={{ color: "#BF55EC" }}>
      <i className="material-icons error-icon">{err}</i>
    </div>
  ) : (
    ""
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErr(null);

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const password = formData.get("password").toString();

    await createUser({ name, email, password })
      .unwrap()
      .then(() => navigate("/signin"))
      .catch(error => {
        setErr(error.data.message);
      });
  };

  return (
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
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  type="email"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  type="password"
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              {errorDiv}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Typography variant="body2">
                  <Link to="/signin">Already have an account? Sign in</Link>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
