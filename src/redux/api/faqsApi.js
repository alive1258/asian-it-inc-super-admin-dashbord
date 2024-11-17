import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const faqs = "/faqs";

export const faqsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  faqs
    createFaqs: build.mutation({
      query: (data) => ({
        url: `${faqs}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.faqs],
    }),

    // Query for fetching all faqs
    getAllFaqs: build.query({
      query: (data) => ({
        url: `${faqs}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faqs],
    }),

    // Query for fetching a single faqs by its ID
    getSingleFaqs: build.query({
      query: (id) => ({
        url: `${faqs}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faqs],
    }),

    // Mutation for updating a single faqs by its ID
    updateFaqs: build.mutation({
      query: ({ id, data }) => ({
        url: `${faqs}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.faqs],
    }),

    // Mutation for deleting a faqs by its ID
    deleteFaqs: build.mutation({
      query: (id) => ({
        url: `${faqs}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faqs],
    }),
  }),
});

export const {
  useCreateFaqsMutation,
  useGetAllFaqsQuery,
  useGetSingleFaqsQuery,
  useUpdateFaqsMutation,
  useDeleteFaqsMutation,
} = faqsApi;
