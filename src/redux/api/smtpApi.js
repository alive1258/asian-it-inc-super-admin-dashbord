import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const SMTP_URL = "/smtp";

export const smtpApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  smtp
    createSmtp: build.mutation({
      query: (data) => ({
        url: `${SMTP_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.smtp],
    }),

    // Query for fetching all smtp
    getAllSmtp: build.query({
      query: (arg) => ({
        url: `${SMTP_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.smtp],
    }),

    // Query for fetching a single smtp by its ID
    getSingleSmtp: build.query({
      query: (id) => ({
        url: `${SMTP_URL}/${id}`,
        method: "GET",
      }),
      invalidatesTags: [tagTypes.smtp],
    }),

    // Mutation for updating a single smtp by its ID
    updateSmtp: build.mutation({
      query: ({ id, data }) => ({
        url: `${SMTP_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.smtp],
    }),

    // Mutation for deleting a smtp by its ID
    deleteSmtp: build.mutation({
      query: (id) => ({
        url: `${SMTP_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.smtp],
    }),
  }),
});

export const {
  useCreateSmtpMutation,
  useGetAllSmtpQuery,
  useGetSingleSmtpQuery,
  useUpdateSmtpMutation,
  useDeleteSmtpMutation,
} = smtpApi;
