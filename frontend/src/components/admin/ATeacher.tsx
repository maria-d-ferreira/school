import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import { useEffect, useState } from "react";
import TeacherCard from "./TeacherCard";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ATeacher: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  const teachers = users.filter(user => user.role === "teacher").reverse();
  const nTeachers = teachers.length;

  const handleApprove = async (id, enable) => {
    const url = process.env.REACT_APP_BASE_URL + "/users/user/" + id;
    const response = await axios
      .patch(url, { enable: enable })
      .catch(error => console.log("Error: ", error));
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
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
              marginTop: "23px",
            }}
          >
            <Item>
              {teachers.map(t => (
                <TeacherCard
                  id={t.id}
                  key={t.email}
                  name={t.name}
                  email={t.email}
                  courses={t.courses}
                  enable={t.enable}
                  handleApprove={handleApprove}
                />
              ))}
            </Item>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ATeacher;