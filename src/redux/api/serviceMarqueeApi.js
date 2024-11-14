import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const service_marquee_url = "/service-marquee";

export const serviceMarqueeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  service
    createServiceMarquee: build.mutation({
      query: (data) => ({
        url: `${service_marquee_url}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.service_marquee],
    }),

    // Query for fetching all service
    getAllServiceMarquee: build.query({
      query: (data) => ({
        url: `${service_marquee_url}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service_marquee],
    }),

    // Query for fetching a single service by its ID
    getSingleServiceMarquee: build.query({
      query: (id) => ({
        url: `${service_marquee_url}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.service_marquee],
    }),

    // Mutation for updating a single service by its ID
    updateServiceMarquee: build.mutation({
      query: ({ id, data }) => ({
        url: `${service_marquee_url}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.service_marquee],
    }),

    // Mutation for deleting a service by its ID
    deleteServiceMarquee: build.mutation({
      query: (id) => ({
        url: `${service_marquee_url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.service_marquee],
    }),
  }),
});

export const {
  useCreateServiceMarqueeMutation,
  useGetAllServiceMarqueeQuery,
  useGetSingleServiceMarqueeQuery,
  useUpdateServiceMarqueeMutation,
  useDeleteServiceMarqueeMutation,
} = serviceMarqueeApi;
