import { memo, useState } from "react";
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
} from "@mui/material";

import { styled } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { usersActions } from "../../../store/users.slice";
import { IUsers } from "../../../interfaces/IUsers";

const tableContainerSx: SxProps = {
  width: "100%",
  marginTop: 7.4,
  borderRadius: 2,
  marginLeft: "auto",
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface Props {
  students: IUsers[];
  course: string;
}

const AStudentsTable: React.FC<Props> = props => {
  const { students, course } = props;
  const [assign, setAssign] = useState(true);
  const handleClick = () => {
    setAssign(prev => !prev);
  };

  const dispatch = useDispatch();

  const handleAssign = async (id: string) => {
    const url = process.env.REACT_APP_BASE_URL + "/courses/course/" + id;
    await axios.delete(url);

    const ur = process.env.REACT_APP_BASE_URL + "/courses/courses";
    await axios.get(ur).then(function (response) {
      dispatch(usersActions.getUsers(response.data));
    });
  };

  if (students.length > 0) {
  }

  return (
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
            <TableCell scope="header">{`${course} - students `}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.length > 0 &&
            students
              .map((student: any) => (
                <TableRow key={Math.random()}>
                  <TableCell
                    scope="row"
                    sx={{
                      color: "primary.main",
                    }}
                  >
                    {student.name}
                  </TableCell>
                </TableRow>
              ))
              .sort()}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(AStudentsTable);
