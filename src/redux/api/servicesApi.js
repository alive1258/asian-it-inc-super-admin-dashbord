import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const service_url = "/services";

export const servicesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  service
    createService: build.mutation({
      query: (data) => ({
        url: `${service_url}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    // Query for fetching all service
    getAllService: build.query({
      query: (data) => ({
        url: `${service_url}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    // Query for fetching a single service by its ID
    getSingleService: build.query({
      query: (id) => ({
        url: `${service_url}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service],
    }),

    // Mutation for updating a single service by its ID
    updateService: build.mutation({
      query: ({ id, data }) => ({
        url: `${service_url}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.service],
    }),

    // Mutation for deleting a service by its ID
    deleteService: build.mutation({
      query: (id) => ({
        url: `${service_url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service],
    }),
  }),
});

export const {
  useCreateServiceMutation,
  useGetAllServiceQuery,
  useGetSingleServiceQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = servicesApi;
