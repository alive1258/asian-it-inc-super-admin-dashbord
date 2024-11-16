import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const capabilities = "/capabilities";

export const capabilitiesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  capabilities
    createCapabilities: build.mutation({
      query: (data) => ({
        url: `${capabilities}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.capabilities],
    }),

    // Query for fetching all capabilities
    getAllCapabilities: build.query({
      query: (data) => ({
        url: `${capabilities}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.capabilities],
    }),

    // Query for fetching a single capabilities by its ID
    getSingleCapabilities: build.query({
      query: (id) => ({
        url: `${capabilities}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.capabilities],
    }),

    // Mutation for updating a single capabilities by its ID
    updateCapabilities: build.mutation({
      query: ({ id, data }) => ({
        url: `${capabilities}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.capabilities],
    }),

    // Mutation for deleting a capabilities by its ID
    deleteCapabilities: build.mutation({
      query: (id) => ({
        url: `${capabilities}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.capabilities],
    }),
  }),
});

export const {
  useCreateCapabilitiesMutation,
  useGetAllCapabilitiesQuery,
  useGetSingleCapabilitiesQuery,
  useUpdateCapabilitiesMutation,
  useDeleteCapabilitiesMutation,
} = capabilitiesApi;
