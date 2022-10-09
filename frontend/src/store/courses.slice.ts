import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICourse } from "../interfaces/ICourses";

const initialState = {
  courses: [],
};

const CoursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    getCourses: (state, action) => {
      state.courses = action.payload;
    },
    replaceCourses(state, action: PayloadAction<ICourse[]>) {
      state.courses = action.payload;
    },
    addCourse(state, action: PayloadAction<ICourse>) {
      if (
        !state.courses.find(
          (course: ICourse) => course.id === action.payload.id
        )
      ) {
        const newCourse = {
          id: action.payload.id,
          title: action.payload.title,
          description: action.payload.description,
          start: action.payload.start,
          end: action.payload.end,
          teacher: action.payload.teacher,
          students: action.payload.students,
        };
        state.courses.push(newCourse);
        state.courses = state.courses.sort();
      }
    },
    deleteCourse(state, action: PayloadAction<string>) {
      state.courses = state.courses.filter(
        (course: ICourse) => course.id !== action.payload
      );
    },
  },
});

export const coursesActions = CoursesSlice.actions;
export default CoursesSlice;
