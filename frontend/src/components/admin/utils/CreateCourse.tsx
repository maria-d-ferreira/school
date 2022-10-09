import React, { memo, useState } from "react";
import TextField from "@mui/material/TextField";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { ICourse } from "../../../interfaces/ICourses";
import axios from "axios";
import useValidateInput from "../../../hooks/useValidateInput";
import { useDispatch } from "react-redux";
import { coursesActions } from "../../../store/courses.slice";

import { store } from "../../../store/store";

interface Props {
  handeleShowCreate(b: boolean): void;
}

const CreateCourse: React.FC<Props> = props => {
  const { handeleShowCreate } = props;
  const [err, setErr] = useState(null);

  const dispatch = useDispatch();

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 1);

  const [start, setStart] = useState<Date | undefined>(tomorrow);
  const [end, setEnd] = useState<Date | undefined>(tomorrow);

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    hasError: titleError,
    valueChangeHandler: titleChangedHandler,
    reset: reseTitleInput,
  } = useValidateInput((value: string) => value !== "");

  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionError,
    valueChangeHandler: descriptionChangedHandler,
    reset: resetDescriptionInput,
  } = useValidateInput((value: string) => value !== "");

  const validateStartDate = start && start.getTime() <= today.getTime();

  const validateEndDate = !(end && start && end.getTime() >= start.getTime());

  const validateForm: boolean =
    enteredTitleIsValid &&
    enteredDescriptionIsValid &&
    !validateStartDate &&
    !validateEndDate;

  const resetInputs = () => {
    reseTitleInput();
    resetDescriptionInput();
    setStart(tomorrow);
    setEnd(tomorrow);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErr(null);

    const newCourse: ICourse = {
      title: enteredTitle.toLocaleUpperCase(),
      description: enteredDescription,
      start: start || new Date(),
      end: end || new Date(),
      teacher: {},
      students: [],
    };

    let foundCourse = [];
    const courses = store.getState().courses.courses;
    if (courses.length > 0) {
      foundCourse = courses.filter(c => c.title === enteredTitle.toUpperCase());
    }

    if (foundCourse.length > 0) {
      return setErr("Class already exists! ");
    } else {
      const url = process.env.REACT_APP_BASE_URL + "/courses/create";
      await axios
        .post(url, newCourse)
        .then()
        .catch(error => {
          setErr("Something went Wrong !");
        });

      const ur = process.env.REACT_APP_BASE_URL + "/courses/courses";
      await axios
        .get(ur)
        .then(function (response) {
          dispatch(coursesActions.getCourses(response.data));
        })

        .catch(error => {
          setErr("Something went Wrong !");
        });
      setErr(null);
      resetInputs();
    }
  };

  const errorDiv = err ? (
    <div className="error" style={{ color: "#E3A15A" }}>
      <i className="material-icons error-icon">{err}</i>
    </div>
  ) : (
    ""
  );
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
          Create class
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                autoFocus
                error={titleError}
                value={enteredTitle}
                onChange={titleChangedHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="description"
                autoFocus
                error={descriptionError}
                value={enteredDescription}
                onChange={descriptionChangedHandler}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container mt={2}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Grid item xs={5}>
                    <DesktopDatePicker
                      label="Start"
                      inputFormat="dd/MM/yyyy"
                      value={start}
                      onChange={(newValue: Date | null) => {
                        if (newValue) {
                          setStart(newValue);
                        }
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          required
                          error={start && validateStartDate}
                          helperText={
                            start instanceof Date &&
                            !isNaN(start.getTime()) &&
                            validateStartDate &&
                            "Invalid date - past date!"
                          }
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={2}></Grid>
                  <Grid item xs={5}>
                    <DesktopDatePicker
                      label="End"
                      inputFormat="dd/MM/yyyy"
                      value={end}
                      onChange={(newValue: Date | null) => {
                        if (newValue) {
                          setEnd(newValue);
                        }
                      }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          required
                          error={validateEndDate}
                          helperText={
                            end instanceof Date &&
                            !isNaN(end.getTime()) &&
                            end.toString() !== "Invalid Data" &&
                            validateEndDate &&
                            "End date must be greather than start date!"
                          }
                        />
                      )}
                    />
                  </Grid>
                </LocalizationProvider>
              </Grid>
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
                disabled={!validateForm}
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

export default memo(CreateCourse);
