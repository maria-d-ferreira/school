import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

import { useState } from "react";
import TeacherCard from "./utils/TeacherCard";

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

const ATeacher: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  useSelector(state => state.users.users);
  const users = store.getState().users.users;
  const teachers = users.filter(user => user.role === "teacher").reverse();
  const nTeachers = teachers.length;

  const handleApprove = async (id, enable) => {
    const url = process.env.REACT_APP_BASE_URL + "/users/user/" + id;
    const response = await axios
      .patch(url, { enable: enable })
      .catch(error => console.log("Error: ", error));

    const ur = process.env.REACT_APP_BASE_URL + "/users/users";
    await axios.get(ur).then(function (response) {
      dispatch(usersActions.getUsers(response.data));
    });
  };


  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4}>
        <Grid item xs={3} minWidth={325}>
          <Typography variant="body1" textAlign={"left"}>
            {`teachers : ${nTeachers}  `}
          </Typography>
          {teachers.length > 0 && (
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
                    key={Math.random()}
                    name={t.name}
                    email={t.email}
                    enable={t.enable}
                    handleApprove={handleApprove}
                  />
                ))}
              </Item>
            </Item>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ATeacher;
