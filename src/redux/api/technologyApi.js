import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const technologies = "/technologies";

export const technologyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  technologies
    createTechnology: build.mutation({
      query: (data) => ({
        url: `${technologies}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.technology],
    }),

    // Query for fetching all technologies
    getAllTechnology: build.query({
      query: (data) => ({
        url: `${technologies}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.technology],
    }),

    // Query for fetching a single technologies by its ID
    getSingleTechnology: build.query({
      query: (id) => ({
        url: `${technologies}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.technology],
    }),

    // Mutation for updating a single technologies by its ID
    updateTechnology: build.mutation({
      query: ({ id, data }) => ({
        url: `${technologies}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.technology],
    }),

    // Mutation for deleting a technologies by its ID
    deleteTechnology: build.mutation({
      query: (id) => ({
        url: `${technologies}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.technology],
    }),
  }),
});

export const {
  useCreateTechnologyMutation,
  useGetAllTechnologyQuery,
  useGetSingleTechnologyQuery,
  useUpdateTechnologyMutation,
  useDeleteTechnologyMutation,
} = technologyApi;
