import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const faq_category = "/faq-category";

export const faqsCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  FaqCategory
    createFaqCategory: build.mutation({
      query: (data) => ({
        url: `${faq_category}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.faq_category],
    }),

    // Query for fetching all FaqCategory
    getAllFaqCategory: build.query({
      query: (data) => ({
        url: `${faq_category}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq_category],
    }),

    // Query for fetching a single FaqCategory by its ID
    getSingleFaqCategory: build.query({
      query: (id) => ({
        url: `${faq_category}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.faq_category],
    }),

    // Mutation for updating a single FaqCategory by its ID
    updateFaqCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `${faq_category}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.faq_category],
    }),

    // Mutation for deleting a FaqCategory by its ID
    deleteFaqCategory: build.mutation({
      query: (id) => ({
        url: `${faq_category}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.faq_category],
    }),
  }),
});

export const {
  useCreateFaqCategoryMutation,
  useGetAllFaqCategoryQuery,
  useGetSingleFaqCategoryQuery,
  useUpdateFaqCategoryMutation,
  useDeleteFaqCategoryMutation,
} = faqsCategoryApi;
