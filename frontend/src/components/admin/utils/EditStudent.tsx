import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { TextField } from "@material-ui/core";
import FormDialog from "../../utils/FormDialog";
import { Users } from "../../../interfaces/Users";
import axios from "axios";

interface Props {
  handleShowEdit: (b: boolean) => void;
  id: string;
  name: string;
  email: string;

  handleDelete: (b: boolean, id: string) => void;
  handleUpdate: (b: boolean) => void;
  students: Users[];
}

const clearForm = () => {
  Array.from(document.querySelectorAll("input")).forEach(
    input => (input.value = "")
  );
};

const EditStudent: React.FC<Props> = props => {
  const {
    id,
    name,
    email,
    handleShowEdit,
    handleDelete,
    handleUpdate,
    students,
  } = props;

  const [err, setErr] = useState(null);

  const [inputName, setInputName] = useState(name);
  const [inputEmail, setInputEmail] = useState(email);
  const [inputOldPwd, setInputOldPwd] = useState(null);
  const [inputNewPwd, setInputNewPwd] = useState(null);
  const [nameChange, setNameChange] = useState(false);
  const [emailChange, setEmailChange] = useState(false);
  const [oldPwdChange, setOldPwdChange] = useState(false);
  const [newPwdChange, setNewPwdChange] = useState(false);

  const [openDialog, setOpenDialog] = useState(false);

  const errorDiv = err ? (
    <div className="error" style={{ color: "#E3A15A" }}>
      <i className="material-icons error-icon">{err}</i>
    </div>
  ) : (
    ""
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    s: string
  ) => {
    switch (s) {
      case "name":
        setInputName(event.target.value);
        break;
      case "email":
        setInputEmail(event.target.value);
        break;
      case "oldPwd":
        setInputOldPwd(event.target.value);
        break;
      case "newPwd":
        setInputNewPwd(event.target.value);
        break;

      default:
        break;
    }
  };

  const validateInput = () => {
    setErr(null);

    if (nameChange && inputName === "") {
      setErr("Name required!");
      return false;
    }
    if (nameChange && !inputEmail.includes("@")) {
      setErr("Pease enter a valid email!");
      return false;
    }
    if (newPwdChange) {
      if (inputOldPwd === "") {
        setErr("need to provide oldPassword");
        return false;
      }
      if (inputNewPwd.length < 8) {
        setErr("password minimum of 8 characters");
        return false;
      }
    }

    return true;
  };

  const emailExists = () => {
    if (
      students.some(
        student => student["email"] === inputEmail && student["id"] !== id
      )
    ) {
      setErr("Email already exists");
      return true;
    }
    return false;
  };

  const updateStudent = async () => {
    setErr(null);
    const url = process.env.REACT_APP_BASE_URL + "/users/user/student/" + id;
    if (inputNewPwd) {
      await axios
        .patch(url, {
          name: inputName,
          email: inputEmail,
          oldPassword: inputOldPwd,
          password: inputNewPwd,
        })
        .then(() => handleUpdate(true))
        .catch(error => setErr("Wrong Credentials !"));
    } else {
      await axios
        .patch(url, {
          name: inputName,
          email: inputEmail,
        })
        .then(() => handleUpdate(true))
        .catch(error => setErr("Something went Wrong !"));
    }
  };

  const handleUpdateStudent = async () => {
    if (nameChange || emailChange || newPwdChange) {
      if (validateInput()) {
        if (!emailExists()) {
          updateStudent();
        }
      }
    }
  };

  const handleDialog = (b: boolean) => {
    handleDelete(b, id);
    setOpenDialog(prev => !prev);
  };

  useEffect(() => {
    setInputName(name);
    setInputEmail(email);
  }, [id]);

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
                name="name"
                fullWidth
                id="name"
                label="Name"
                value={inputName}
                onChange={e => {
                  handleChange(e, "name");
                  setNameChange(true);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="email"
                fullWidth
                id="email"
                name="email"
                label="Email"
                value={inputEmail}
                onChange={e => {
                  handleChange(e, "email");
                  setEmailChange(true);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                name="oldPwd"
                id="oldPwd"
                label="Old password"
                onChange={e => {
                  handleChange(e, "oldPwd");
                  setOldPwdChange(true);
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                type="text"
                fullWidth
                name="newPwd"
                id="newPwd"
                label="New password"
                onChange={e => {
                  handleChange(e, "newPwd");
                  setNewPwdChange(true);
                }}
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
                style={{
                  textTransform: "none",
                }}
                onClick={() => setOpenDialog(true)}
              >
                delete
              </Button>
            </Grid>

            <Grid item xs={4}>
              <Button
                type="button"
                variant="contained"
                style={{ textTransform: "none" }}
                onClick={handleUpdateStudent}
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
                close
              </Button>
              {openDialog ? (
                <FormDialog
                  title="Are you sure you want to delete"
                  text={`${name}  ? `}
                  openDialog={true}
                  handleDialog={handleDialog}
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
