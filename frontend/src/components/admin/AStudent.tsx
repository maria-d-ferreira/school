import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";

import StudentCard from "./utils/StudentCard";
import CreateStudent from "./utils/CreateStudent";
import EditStudent from "./utils/EditStudent";
import { setDefaultResultOrder } from "dns/promises";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AStudent: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newStudent, setNewStudent] = useState(false);
  const [deleteStudent, setDeleteStudent] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    const url = process.env.REACT_APP_BASE_URL + "/users/users";
    const getData = async () => {
      try {
        const response = await axios.get(url);
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUsers(null);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, [newStudent, deleteStudent]);

  const handleNewStudent = () => setNewStudent(prev => !prev);

  const handleEdit = (id: string) => setId(id);

  const handleShowCreate = (b: boolean) => setShowCreate(b);

  const handleShowEdit = (b: boolean) => {
    setShowCreate(false);
    setShowEdit(b);
  };

  const handleDelete = async id => {
    const url = process.env.REACT_APP_BASE_URL + "/users/user/" + id;
    const response = await axios.delete(url);
    setShowEdit(false);
    setDeleteStudent(prev => !prev);
  };

  const handleUpdate = () => {};

  const students = users.filter(user => user.role === "student");
  const nStudents = students.length;

  const student = students.filter(student => student.id === id)[0];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={3} minWidth={325}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="body1" textAlign={"left"}>
                {`students : ${nStudents}  `}
              </Typography>
            </Grid>

            <Grid item xs={6} marginTop="5px">
              <Button
                type="button"
                variant="contained"
                style={{ textTransform: "none" }}
                onClick={() => {
                  setShowCreate(true);
                  setShowEdit(false);
                }}
              >
                create student
              </Button>
            </Grid>
          </Grid>

          <Item
            sx={{
              overflowX: "hidden",
              overflowY: "scroll",
              maxHeight: "700px",
              marginTop: "10px",
            }}
          >
            <Item>
              {students
                .map(t => (
                  <StudentCard
                    id={t.id}
                    key={t.email}
                    name={t.name}
                    email={t.email}
                    handleEdit={handleEdit}
                    handleShowEdit={handleShowEdit}
                  />
                ))
                .reverse()}
            </Item>
          </Item>
        </Grid>

        {showCreate && (
          <Grid item xs={4} minWidth={325} paddingLeft={3}>
            <Item>
              <CreateStudent
                handleNewStudent={handleNewStudent}
                handeleShowCreate={handleShowCreate}
              />
            </Item>
          </Grid>
        )}

        {showEdit && (
          <Grid item xs={4} minWidth={325} paddingLeft={3}>
            <Item>
              <EditStudent
                handleShowEdit={handleShowEdit}
                id={student.id}
                name={student.name}
                email={student.email}
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
              />
            </Item>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default AStudent;
