import { apiSlice } from "./apiSlice";
const PROJECTS_URL = "/api/projects";

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProjects: builder.query({
      query: () => `${PROJECTS_URL}`,
    }),
    setProject: builder.mutation({
      query: (data) => ({
        url: `${PROJECTS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllProjectsQuery, useSetProjectMutation } =
  projectsApiSlice;
