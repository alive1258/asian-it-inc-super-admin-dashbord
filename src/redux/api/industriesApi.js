import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const industries = "/industries-we-cover";

export const industriesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  industries
    createIndustries: build.mutation({
      query: (data) => ({
        url: `${industries}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.industries],
    }),

    // Query for fetching all industries
    getAllIndustries: build.query({
      query: (data) => ({
        url: `${industries}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.industries],
    }),

    // Query for fetching a single industries by its ID
    getSingleIndustries: build.query({
      query: (id) => ({
        url: `${industries}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.industries],
    }),

    // Mutation for updating a single industries by its ID
    updateIndustries: build.mutation({
      query: ({ id, data }) => ({
        url: `${industries}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.industries],
    }),

    // Mutation for deleting a industries by its ID
    deleteIndustries: build.mutation({
      query: (id) => ({
        url: `${industries}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.industries],
    }),
  }),
});

export const {
  useCreateIndustriesMutation,
  useGetAllIndustriesQuery,
  useGetSingleIndustriesQuery,
  useUpdateIndustriesMutation,
  useDeleteIndustriesMutation,
} = industriesApi;
