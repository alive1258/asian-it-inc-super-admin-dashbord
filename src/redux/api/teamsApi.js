import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const team = "/our-teams";

export const teamsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  teams
    createTeam: build.mutation({
      query: (data) => ({
        url: `${team}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.team],
    }),

    // Query for fetching all teams
    getAllTeam: build.query({
      query: (data) => ({
        url: `${team}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.team],
    }),

    // Query for fetching a single teams by its ID
    getSingleTeam: build.query({
      query: (id) => ({
        url: `${team}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.team],
    }),

    // Mutation for updating a single teams by its ID
    updateTeam: build.mutation({
      query: ({ id, data }) => ({
        url: `${team}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.team],
    }),

    // Mutation for deleting a teams by its ID
    deleteTeam: build.mutation({
      query: (id) => ({
        url: `${team}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.team],
    }),
  }),
});

export const {
  useCreateTeamMutation,
  useGetAllTeamQuery,
  useGetSingleTeamQuery,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamsApi;
