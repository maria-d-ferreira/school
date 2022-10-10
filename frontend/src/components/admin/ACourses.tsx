import { memo, useEffect, useState } from "react";
import axios from "axios";
import {
  Button,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import { store, useSelector } from "../../store/store";
import CreateCourse from "./utils/CreateCourse";
import FormDialog from "../utils/FormDialog";
import { coursesActions } from "../../store/courses.slice";
import { useDispatch } from "react-redux";
import AStudentsTable from "./utils/AStudentsTable";

const tableContainerSx: SxProps = {
  border: "1px solid rgba(128,128,128,0.4)",
  marginLeft: "auto",
  marginRight: "auto",
  marginTop: 4,
  borderRadius: 2,
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ACourses: React.FC = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const [showStudents, setShowStudents] = useState(false);
  const [title, setTitle] = useState("");
  const [id, setId] = useState("");

  const [course, setCourse] = useState(null);

  const dispatch = useDispatch();

  useSelector(state => state.courses.courses);
  useSelector(state => state.users.users);

  const courses = store.getState().courses.courses;
  const users = store.getState().users.users;
  const teachers = users.filter(u => u.role === "teacher");
  const students = users.filter(u => u.role === "student");

  const handleTeacherChange = async (teacher: string, course: string) => {
    const url =
      process.env.REACT_APP_BASE_URL +
      "/courses/assign-teacher/" +
      teacher +
      "/" +
      course;
    await axios.patch(url);

    const ur = process.env.REACT_APP_BASE_URL + "/courses/courses";
    await axios.get(ur).then(function (response) {
      dispatch(coursesActions.getCourses(response.data));
    });
  };

  const handleTeacherRemove = async (course: string) => {
    const url =
      process.env.REACT_APP_BASE_URL + "/courses/remove-teacher/" + course;
    await axios.patch(url);

    const ur = process.env.REACT_APP_BASE_URL + "/courses/courses";
    await axios.get(ur).then(function (response) {
      dispatch(coursesActions.getCourses(response.data));
    });
  };

  const handleStudentRemove = async (course: string, student: string) => {};
  const handleStudentAdd = async (student: string, course: string) => {
    console.log(course);
    console.log(student);

    const url =
      process.env.REACT_APP_BASE_URL +
      "/courses/add-student/" +
      student +
      "/" +
      course;
    console.log(url);
    await axios.patch(url);

    const ur = process.env.REACT_APP_BASE_URL + "/courses/courses";
    await axios.get(ur).then(function (response) {
      dispatch(coursesActions.getCourses(response.data));
    });
  };

  const handleShowCreate = (b: boolean) => setShowCreate(b);

  const handleShowEdit = (b: boolean) => {
    setShowCreate(false);
    setOpenDialog(b);
  };

  const handleChangeTitle = (title: string) => setTitle(title);
  const handleChangeId = (id: string) => setId(id);

  const handleDialog = (b: boolean) => {
    setOpenDialog(false);
    b && handleDelete(id);
  };

  const handleDelete = async (id: string) => {
    const url = process.env.REACT_APP_BASE_URL + "/courses/course/" + id;
    await axios.delete(url);
    setOpenDialog(false);
    const ur = process.env.REACT_APP_BASE_URL + "/courses/courses";
    await axios.get(ur).then(function (response) {
      dispatch(coursesActions.getCourses(response.data));
    });
  };

  const handleStudents = (title: string) => {
    setShowStudents(true);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={8} minWidth={325}>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="body1" textAlign={"left"}>
                {`classes : ${courses ? courses.length : 0}  `}
              </Typography>
            </Grid>

            <Grid
              item
              xs={4}
              marginTop="5px"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                type="button"
                variant="contained"
                style={{ textTransform: "none" }}
                onClick={() => {
                  setShowCreate(true);
                  setOpenDialog(false);
                  setShowStudents(false);
                }}
              >
                create
              </Button>
            </Grid>
          </Grid>

          <TableContainer component={Paper} sx={tableContainerSx}>
            <Table stickyHeader={true}>
              <TableHead
                sx={{
                  "& .MuiTableCell-stickyHeader": {
                    backgroundColor: "primary.main",
                    color: "white",
                  },
                }}
              >
                <TableRow>
                  <TableCell scope="header">Title</TableCell>
                  <TableCell scope="header">Desciptiom</TableCell>
                  <TableCell scope="header">Start</TableCell>
                  <TableCell scope="header">End</TableCell>
                  <TableCell scope="header">Teacher</TableCell>
                  <TableCell scope="header">Students</TableCell>
                  <TableCell scope="header">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.length > 0 &&
                  courses
                    .map((c: any) => (
                      <TableRow key={Math.random()}>
                        <TableCell
                          scope="row"
                          sx={{
                            fontSize: "1.08rem",
                            color: "primary.main",
                            fontWeight: "bold",
                          }}
                        >
                          {c.title}
                        </TableCell>

                        <TableCell scope="row">{c.description}</TableCell>
                        <TableCell scope="row">{c.start}</TableCell>
                        <TableCell scope="row">{c.end}</TableCell>
                        <TableCell scope="row">
                          {c.teacher ? c.teacher.name : ""}
                        </TableCell>
                        <TableCell scope="row">
                          <Button
                            variant="text"
                            style={{
                              textTransform: "none",
                            }}
                            onClick={() => {
                              setShowCreate(false);
                              setShowStudents(true);
                              setCourse(c);
                            }}
                          >
                            show students
                          </Button>
                        </TableCell>

                        <TableCell scope="row">
                          {/* ----------------------------------------------------------------------------------------------------------------- */}
                          <FormControl
                            variant="standard"
                            sx={{
                              width: "100%",
                            }}
                          >
                            <InputLabel
                              id=""
                              sx={{
                                ml: 1,
                                color: "primary.main",
                                fontSize: "99.97%",
                              }}
                            >
                              teacher
                            </InputLabel>

                            <Select
                              sx={{
                                border: 1,
                                height: "30px",
                                borderRadius: 1,
                                borderColor: "primary.main",
                              }}
                              labelId=""
                              id=""
                              value=""
                              label="Teacher"
                            >
                              <MenuItem
                                sx={{
                                  fontSize: "80%",
                                }}
                                value=""
                                onClick={() => {
                                  handleTeacherRemove(c._id);
                                }}
                              >
                                <em>None</em>
                              </MenuItem>
                              {teachers.sort() &&
                                teachers.length > 0 &&
                                teachers.map((t: any) => (
                                  <MenuItem
                                    sx={{
                                      fontSize: "80%",
                                    }}
                                    key={Math.random()}
                                    value={t}
                                    onClick={() => {
                                      handleTeacherChange(t.id, c._id);
                                    }}
                                  >
                                    {t.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>

                          {/* ----------------------------------------------------------------------------------------------------------------- */}

                          <FormControl
                            variant="standard"
                            sx={{
                              width: "100%",
                            }}
                          >
                            <InputLabel
                              id=""
                              sx={{
                                ml: 1,
                                color: "primary.main",
                                fontSize: "99.97%",
                              }}
                            >
                              students
                            </InputLabel>

                            <Select
                              sx={{
                                border: 1,
                                height: "30px",
                                borderRadius: 1,
                                borderColor: "primary.main",
                              }}
                              labelId=""
                              id=""
                              value=""
                              label="Students"
                            >
                              <MenuItem
                                sx={{
                                  fontSize: "80%",
                                }}
                                value=""
                                onClick={() => {}}
                              >
                                <em>Add all</em>
                              </MenuItem>

                              {students.sort() &&
                                students.length > 0 &&
                                students.map((s: any) => (
                                  <MenuItem
                                    sx={{
                                      fontSize: "80%",
                                    }}
                                    key={Math.random()}
                                    value={s}
                                  >
                                    <Grid
                                      container
                                      sx={{
                                        width: "100%",
                                      }}
                                    >
                                      <Grid item xs={9}>
                                        {s.name}
                                      </Grid>
                                      <Grid item xs={3}>
                                        <Button
                                          variant="text"
                                          sx={{
                                            height: "25px",
                                            textTransform: "none",
                                            alignContent: "left",
                                          }}
                                          onClick={() => {
                                            {
                                              c.students.find(c => c.id == s.id)
                                                ? handleStudentRemove(
                                                    c._id,
                                                    s.id
                                                  )
                                                : handleStudentAdd(s.id, c._id);
                                            }
                                          }}
                                        >
                                          {c.students.find(c => c.id == s.id)
                                            ? "x"
                                            : "+"}
                                        </Button>
                                      </Grid>
                                    </Grid>
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                          {/* ----------------------------------------------------------------------------------------------------------------- */}

                          <Button
                            variant="outlined"
                            style={{
                              height: "25px",
                              width: "100%",
                              textTransform: "none",
                              marginTop: "1.2em",
                            }}
                            onClick={() => {
                              handleChangeTitle(c.title);
                              handleChangeId(c._id);
                              setOpenDialog(true);
                            }}
                          >
                            delete
                          </Button>
                          {/* ----------------------------------------------------------------------------------------------------------------- */}
                        </TableCell>
                      </TableRow>
                    ))
                    .reverse()}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        {/* ----------------------------------------------------------------------------------------------------------------- */}

        {showCreate && (
          <Grid item xs={4} minWidth={325} paddingLeft={3}>
            <Item>
              <CreateCourse handeleShowCreate={handleShowCreate} />
            </Item>
          </Grid>
        )}
        {openDialog && (
          <Grid item xs={3} minWidth={325} paddingLeft={3} border="none">
            <Item>
              <FormDialog
                title="Are you sure you want to delete"
                text={`${title}`}
                openDialog={true}
                handleDialog={handleDialog}
              />
            </Item>
          </Grid>
        )}

        {showStudents && (
          <Grid item xs={4} minWidth={325} paddingLeft={3} border="none">
            <Item>
              <AStudentsTable students={students} course={course.title} />
            </Item>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default memo(ACourses);
