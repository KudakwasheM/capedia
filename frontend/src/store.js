import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import usersReducer from "./slices/usersSlice";
import projectsReducer from "./slices/projectsSlice";
import { apiSlice } from "./slices/apiSlice";
import { authApiSlice } from "./slices/authApiSlice";
import { usersApiSlice } from "./slices/usersApiSlice";
import { projectsApiSlice } from "./slices/projectsApiSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [authApiSlice.reducerPath]: authApiSlice.reducer,
    users: usersReducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    projects: projectsReducer,
    [projectsApiSlice.reducerPath]: projectsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
