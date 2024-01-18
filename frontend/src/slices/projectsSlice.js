import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    getProjects: (state, action) => {
      state.projects = action.payload;
    },
    addProject: (state, action) => {
      const project = action.payload;
      state.push(project);
    },
  },
});

export const { getProjects, addProject } = projectsSlice.actions;

export default projectsSlice.reducer;
