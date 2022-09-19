import React, { useState } from "react";

import { useNavigate } from "react-router";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useCreateUserMutation } from "../../../apis/student.api";
import { InputAdornment, TextField, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

interface Props {
  handleNewStudent(): void;
  handeleShowCreate(b: boolean): void;
}

const CreateStudent: React.FC<Props> = props => {
  const { handleNewStudent, handeleShowCreate } = props;
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();
  const [err, setErr] = useState(null);
  const [showPassword, setShowPassword] = React.useState(false);

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

    const clearForm = () => {
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      );
    };

    await createUser({ name, email, password })
      .unwrap()
      .catch(error => {
        setErr(error.data.message);
      });
    clearForm();

    handleNewStudent();
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

export default CreateStudent;
