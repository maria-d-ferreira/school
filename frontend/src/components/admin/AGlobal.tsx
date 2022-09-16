import * as React from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Select, Typography } from "@mui/material";
import MuiSelect from "../ui/MuiSelect";

import UserCard from "../ui/UserCard";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const url = process.env.REACT_APP_BASE_URL + "/users/users";

const teachers = [];
const nTeachers = teachers.length;

const AGlobal: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  const teachers = users.filter(user => user.role === "teacher");
  const nTeachers = teachers.length;
  const students = users.filter(user => user.role === "student");
  const nStudents = students.length;
  return (
    <Box sx={{ flexGrow: 1, marginLeft: "500" }}>
      <Grid container spacing={4}>
        <Grid item xs={3} minWidth={325}>
          <Typography variant="body1" textAlign={"left"}>
            {`teachers : ${nTeachers}  `}
          </Typography>
          <Item
            sx={{
              overflowX: "hidden",
              overflowY: "scroll",
              maxHeight: "700px",
            }}
          >
            <Item>
              {teachers.map(t => (
                <UserCard
                  key={t.email}
                  name={t.name}
                  email={t.email}
                  courses={t.courses}
                />
              ))}
            </Item>
          </Item>
        </Grid>

        <Grid item xs={3} minWidth={325}>
          <Typography variant="body1" textAlign={"left"}>
            {`sudents : ${nStudents} `}
          </Typography>
          <Item
            sx={{
              overflowX: "hidden",
              overflowY: "scroll",
              maxHeight: "700px",
            }}
          >
            <Item>
              {students.map(t => (
                <UserCard
                  key={t.email}
                  name={t.name}
                  email={t.email}
                  courses={t.courses}
                />
              ))}
            </Item>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AGlobal;
