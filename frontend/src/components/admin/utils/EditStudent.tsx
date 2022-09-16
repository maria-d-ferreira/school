import React, { useCallback, useEffect, useRef, useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useCreateUserMutation } from "../../../apis/student.api";
import { TextField } from "@material-ui/core";
import FormDialog from "../../utils/FormDialog";

interface Props {
  handleShowEdit: (b: boolean) => void;
  id: string;
  name: string;
  email: string;
  handleDelete: (id: string) => void;
  handleUpdate: () => void;
}

const clearForm = () => {
  Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
  );
};

const EditStudent: React.FC<Props> = props => {
  const { id, name, email, handleShowEdit, handleDelete } = props;

  const [createUser] = useCreateUserMutation();
  const [err, setErr] = useState(null);

  const [inputName, setInputName] = useState(name);
  const [inputEmail, setInputEmail] = useState(email);

  const [openDialog, setOpenDialog] = useState(false);

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
  };

  const handleUpdate = () => {};

  useEffect(() => {
    setInputName(name);
    setInputEmail(email);
  }, [name]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    s: string
  ) => {
    s === "name"
      ? setInputName(event.target.value)
      : setInputEmail(event.target.value);
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
          Edit student
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="name"
                required
                fullWidth
                id="name"
                label="Name"
                value={inputName}
                onChange={e => handleChange(e, "name")}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                type="email"
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                label="Email"
                value={inputEmail}
                onChange={e => handleChange(e, "email")}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                type="text"
                fullWidth
                name="oldPwd"
                id="oldPwd"
                autoComplete="new-password"
                label="Old password"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                type="text"
                fullWidth
                name="newPwd"
                id="newPwd"
                autoComplete="new-password"
                label="New password"
              />
            </Grid>
          </Grid>

          <Grid item xs={12}>
            {errorDiv}
          </Grid>

          <Grid container mt={2}>
            <Grid item xs={4}>
              <Button
                type="button"
                variant="contained"
                style={{ textTransform: "none" }}
                onClick={() => handleDelete(id)}
              >
                delete
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                type="button"
                variant="contained"
                style={{ textTransform: "none" }}
                onClick={handleUpdate}
              >
                update
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                type="button"
                variant="contained"
                style={{ textTransform: "none" }}
                onClick={() => {
                  handleShowEdit(false);
                  clearForm();
                }}
              >
                cancel
              </Button>
              {openDialog ? (
                <FormDialog
                  title="Are you sure you want to delete"
                  text={`${name}   `}
                  openDialog={openDialog}
                />
              ) : null}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default EditStudent;
