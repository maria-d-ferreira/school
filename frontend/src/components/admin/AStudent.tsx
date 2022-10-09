import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { memo, useEffect, useState } from "react";

import StudentCard from "./utils/StudentCard";
import CreateStudent from "./utils/CreateStudent";
import EditStudent from "./utils/EditStudent";

import { usersActions } from "../../store/users.slice";
import { useDispatch } from "react-redux";
import { store, useSelector } from "../../store/store";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AStudent: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showCreate, setShowCreate] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  useSelector(state => state.users.users);
  const users = store.getState().users.users;

  const handleEdit = (id: string) => setId(id);

  const handleShowCreate = (b: boolean) => setShowCreate(b);

  const handleShowEdit = (b: boolean) => {
    setShowCreate(false);
    setShowEdit(b);
  };

  const handleDelete = async (b: boolean, id: string) => {
    if (b) {
      const url = process.env.REACT_APP_BASE_URL + "/users/user/" + id;
      await axios.delete(url);
      setShowEdit(false);
    }
    const ur = process.env.REACT_APP_BASE_URL + "/users/users";
    await axios.get(ur).then(function (response) {
      dispatch(usersActions.getUsers(response.data));
    });
  };

  const handleUpdate = (b: boolean) => {
    if (b) {
      setShowEdit(false);
    }
  };

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

            <Grid
              item
              xs={6}
              marginTop="5px"
              style={{ display: "flex", justifyContent: "flex-end" }}
            >
              <Button
                type="button"
                variant="contained"
                style={{ textTransform: "none" }}
                onClick={() => {
                  setShowCreate(true);
                  setShowEdit(false);
                }}
              >
                create
              </Button>
            </Grid>
          </Grid>

          {students.length > 0 && (
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
                  .map(s => (
                    <StudentCard
                      id={s.id}
                      key={Math.random()}
                      name={s.name}
                      email={s.email}
                      handleEdit={handleEdit}
                      handleShowEdit={handleShowEdit}
                    />
                  ))
                  .reverse()}
              </Item>
            </Item>
          )}
        </Grid>

        {showCreate && (
          <Grid item xs={4} minWidth={325} paddingLeft={3}>
            <Item>
              <CreateStudent handeleShowCreate={handleShowCreate} />
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
                students={students}
              />
            </Item>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default memo(AStudent);
