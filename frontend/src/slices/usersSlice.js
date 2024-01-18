import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      const user = action.payload;
      state.push(user);
    },
    addUser: (state, action) => {
      const user = action.payload;
      state.push(user);
    },
  },
});

export const { getUsers, addUser } = usersSlice.actions;

export default usersSlice.reducer;
