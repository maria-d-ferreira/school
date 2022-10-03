import axios from "axios";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import Button from "@mui/material/Button";

import { useEffect, useState } from "react";

import CreateStudent from "./utils/CreateStudent";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// const ACourses: React.FC = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newCourse, setNewCourse] = useState(false);
//   const [deleteCourse, setDeleteCourse] = useState(false);
//   const [updateCourse, setUpdateCourse] = useState(false);
//   const [showCreate, setShowCreate] = useState(false);
//   const [showEdit, setShowEdit] = useState(false);
//   const [id, setId] = useState("");

//   useEffect(() => {
//     const url = process.env.REACT_APP_BASE_URL + "/courses/courses";
//     const getData = async () => {
//       try {
//         const response = await axios.get(url);
//         setCourses(response.data);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         setCourses(null);
//       } finally {
//         setLoading(false);
//       }
//     };
//     getData();
//   }, [newCourse, deleteCourse, updateCourse]);

//   const handleNewCourse = () => setNewCourse(prev => !prev);

//   const handleEdit = (id: string) => setId(id);

//   const handleShowCreate = (b: boolean) => setShowCreate(b);

//   const handleShowEdit = (b: boolean) => {
//     setShowCreate(false);
//     setShowEdit(b);
//   };

//   const handleDelete = async (b: boolean, id: string) => {
//     if (b) {
//       const url = process.env.REACT_APP_BASE_URL + "/courses/course/" + id;
//       await axios.delete(url);
//       setShowEdit(false);
//       setDeleteCourse(prev => !prev);
//     }
//   };

//   const handleUpdate = (b: boolean) => {
//     if (b) {
//       setShowEdit(false);
//       setUpdateCourse(prev => !prev);
//     }
//   };

//   const nCourses = courses.length;

//   const course = courses.filter(course => course.id === id)[0];

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={4}>
//         <Grid item xs={3} minWidth={325}>
//           <Grid container>
//             <Grid item xs={6}>
//               <Typography variant="body1" textAlign={"left"}>
//                 {`courses : ${nCourses}  `}
//               </Typography>
//             </Grid>

//             <Grid item xs={6} marginTop="5px">
//               <Button
//                 type="button"
//                 variant="contained"
//                 style={{ textTransform: "none" }}
//                 onClick={() => {
//                   setShowCreate(true);
//                   setShowEdit(false);
//                 }}
//               >
//                 create course
//               </Button>
//             </Grid>
//           </Grid>

//           {courses.length > 0 && (
//             <Item
//               sx={{
//                 overflowX: "hidden",
//                 overflowY: "scroll",
//                 maxHeight: "700px",
//                 marginTop: "10px",
//               }}
//             >
//               <Item>
//                 {courses
//                   .map(s => (
//                     <CourseCard
//                       id={c.id}
//                       key={c.id}
//                       title={c.title}
//                       description={c.description}
//                       start={c.start}
//                       end={c.end}
//                       teacher={course.teacher}
//                       handleEdit={handleEdit}
//                       handleShowEdit={handleShowEdit}
//                     />
//                   ))
//                   .reverse()}
//               </Item>
//             </Item>
//           )}
//         </Grid>

//         {showCreate && (
//           <Grid item xs={4} minWidth={325} paddingLeft={3}>
//             <Item>
//               <CreateStudent
//                 handleNewCourse={handleNewCourse}
//                 handeleShowCreate={handleShowCreate}
//               />
//             </Item>
//           </Grid>
//         )}

//         {showEdit && (
//           <Grid item xs={4} minWidth={325} paddingLeft={3}>
//             <Item>
//               <EditCourse
//                 id={c.id}
//                 key={c.id}
//                 title={c.title}
//                 description={c.description}
//                 start={c.start}
//                 end={c.end}
//                 handleDelete={handleDelete}
//                 handleUpdate={handleUpdate}
//                 handleShowEdit={handleShowEdit}
//                 courses={courses}
//               />
//             </Item>
//           </Grid>
//         )}
//       </Grid>
//     </Box>
//   );
// };

// export default ACourses;
