import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
//import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useCreateUserMutation } from "../../apis/teacher.api";
import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import axios from "axios";
import { useDispatch } from "react-redux";
import { usersActions } from "../../store/users.slice";

// const validateEmail(e: React.FormEvent<HTMLFormElement>) => {
//   const = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(e);
// }

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const [err, setErr] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);
  const dispatch = useDispatch();

  const handleTogglePassword = () =>
    setShowPassword(showPassword => !showPassword);

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
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const password = formData.get("password").toString();

    if (password.length < 8) {
      return setErr("password minimum of 8 characters");
    }

    await createUser({ name, email, password })
      .unwrap()
      .then(() => navigate("/signin"))
      .catch(error => {
        setErr(error.data.message);
      });
    const url = process.env.REACT_APP_BASE_URL + "/users/users";
    await axios.get(url).then(function (response) {
      dispatch(usersActions.getUsers(response.data));
    });
  };

  return (
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
          Register as a Teacher
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
                label="Full Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                type="email"
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type={showPassword ? "text" : "password"}
                fullWidth
                name="password"
                label="Password (min 8 characters)"
                id="password"
                autoComplete="new-password"
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <IconButton
                //         aria-label="toggle password visibility"
                //         onClick={handleTogglePassword}
                //       >
                //         {showPassword ? <Visibility /> : <VisibilityOff />}
                //       </IconButton>
                //     </InputAdornment>
                //   ),
                // }}
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
            Register
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
  );
};

export default SignUp;
