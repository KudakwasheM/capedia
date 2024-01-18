import { apiSlice } from "./apiSlice";
const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => `${USERS_URL}`,
    }),
    getEnterpreneurs: builder.query({
      query: () => `${USERS_URL}/enterpreneur`,
    }),
    setUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetEnterpreneursQuery,
  useSetUserMutation,
} = usersApiSlice;
