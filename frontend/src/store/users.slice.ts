import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../interfaces/IUsers";

const initialState = {
  users: [],
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const usersActions = UsersSlice.actions;
export default UsersSlice;
