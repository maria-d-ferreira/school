import React, { memo, useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import useValidateInput from "../../../hooks/useValidateInput";
import { useCreateUserMutation } from "../../../apis/student.api";
import { TextField } from "@material-ui/core";
import axios from "axios";
import { usersActions } from "../../../store/users.slice";
import { useDispatch } from "react-redux";

interface Props {
  handeleShowCreate(b: boolean): void;
}

const CreateStudent: React.FC<Props> = props => {
  const { handeleShowCreate } = props;
  const [createUser] = useCreateUserMutation();
  const [err, setErr] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const errorDiv = err ? (
    <div className="error" style={{ color: "#E3A15A" }}>
      <i className="material-icons error-icon">{err}</i>
    </div>
  ) : (
    ""
  );

  // const {
  //   value: enteredName,
  //   isValid: enteredNameIsValid,
  //   hasError: nameError,
  //   valueChangeHandler: nameChangedHandler,
  //   reset: reseNameInput,
  // } = useValidateInput((value: string) => value !== "");

  // const {
  //   value: enteredEmail,
  //   isValid: enteredEmailIsValid,
  //   hasError: emailError,
  //   valueChangeHandler: emailChangedHandler,
  //   reset: resetEmailInput,
  // } = useValidateInput((value: string) => value !== "");

  // const {
  //   value: enteredPassword,
  //   isValid: enteredPasswordIsValid,
  //   hasError: passwordError,
  //   valueChangeHandler: passwordChangedHandler,
  //   reset: resetPasswordInput,
  // } = useValidateInput((value: string) => !(value.length < 8));

  // const validateForm: boolean =
  //   enteredNameIsValid && enteredEmailIsValid && enteredPasswordIsValid;

  // const resetInputs = () => {
  //   reseNameInput();
  //   resetEmailInput();
  //   resetPasswordInput();
  // };

  const clearForm = () => {
    Array.from(document.querySelectorAll("input")).forEach(
      input => (input.value = "")
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setErr(null);
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = formData.get("name").toString();
    const email = formData.get("email").toString();
    const password = formData.get("password").toString();

    if (password.length < 8) {
      return setErr("password minimum of 8 characters");
    }
    await createUser({ name, email, password })
      .unwrap()
      .catch(error => {
        setErr(error.data.message);
      });

    if (err) {
      clearForm();
    }

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
          marginTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h6">
          Create student
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="name"
                required
                fullWidth
                id="name"
                label="Full Name"
                autoFocus
                // error={nameError}
                // value={enteredName}
                // onChange={nameChangedHandler}
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
                onFocus={() => setErr(null)}
                // error={emailError}
                // value={enteredEmail}
                // onChange={emailChangedHandler}
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
                // error={passwordError}
                // value={enteredPassword}
                // onChange={passwordChangedHandler}
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {errorDiv}
          </Grid>

          <Grid container mt={2}>
            <Grid item xs={6}>
              <Button
                type="submit"
                style={{ width: "75%", textTransform: "none" }}
                size="medium"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // disabled={!validateForm}
              >
                create
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="button"
                style={{ width: "75%", textTransform: "none" }}
                size="medium"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => handeleShowCreate(false)}
              >
                close
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default memo(CreateStudent);
