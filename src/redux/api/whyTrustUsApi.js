import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const why_trust_us_url = "/why-trust-us";

export const whyTrustUsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  service
    createWhTrustUs: build.mutation({
      query: (data) => ({
        url: `${why_trust_us_url}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.why_trust_us],
    }),

    // Query for fetching all service
    getAllWhTrustUs: build.query({
      query: (data) => ({
        url: `${why_trust_us_url}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.why_trust_us],
    }),

    // Query for fetching a single service by its ID
    getSingleWhTrustUs: build.query({
      query: (id) => ({
        url: `${why_trust_us_url}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.why_trust_us],
    }),

    // Mutation for updating a single service by its ID
    updateWhTrustUs: build.mutation({
      query: ({ id, data }) => ({
        url: `${why_trust_us_url}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.why_trust_us],
    }),

    // Mutation for deleting a service by its ID
    deleteWhTrustUs: build.mutation({
      query: (id) => ({
        url: `${why_trust_us_url}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.why_trust_us],
    }),
  }),
});

export const {
  useCreateWhTrustUsMutation,
  useGetAllWhTrustUsQuery,
  useGetSingleWhTrustUsQuery,
  useUpdateWhTrustUsMutation,
  useDeleteWhTrustUsMutation,
} = whyTrustUsApi;
