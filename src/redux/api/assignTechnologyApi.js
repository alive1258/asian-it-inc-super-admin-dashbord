import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const assigned_technology = "/assigned-technology";

export const assignTechnologyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  AssignTechnology
    createAssignTechnology: build.mutation({
      query: (data) => ({
        url: `${assigned_technology}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.assigned_technology],
    }),

    // Query for fetching all AssignTechnology
    getAllAssignTechnology: build.query({
      query: (data) => ({
        url: `${assigned_technology}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.assigned_technology],
    }),

    // Query for fetching a single AssignTechnology by its ID
    getSingleAssignTechnology: build.query({
      query: (id) => ({
        url: `${assigned_technology}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.assigned_technology],
    }),

    // Mutation for updating a single AssignTechnology by its ID
    updateAssignTechnology: build.mutation({
      query: ({ id, data }) => ({
        url: `${assigned_technology}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.assigned_technology],
    }),

    // Mutation for deleting a AssignTechnology by its ID
    deleteAssignTechnology: build.mutation({
      query: (id) => ({
        url: `${assigned_technology}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.assigned_technology],
    }),
  }),
});

export const {
  useCreateAssignTechnologyMutation,
  useGetAllAssignTechnologyQuery,
  useGetSingleAssignTechnologyQuery,
  useUpdateAssignTechnologyMutation,
  useDeleteAssignTechnologyMutation,
} = assignTechnologyApi;
