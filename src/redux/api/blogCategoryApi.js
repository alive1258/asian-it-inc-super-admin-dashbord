import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const blog_category = "/blog-category";

export const blogCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  BlogCategory
    createBlogCategory: build.mutation({
      query: (data) => ({
        url: `${blog_category}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blog_category],
    }),

    // Query for fetching all BlogCategory
    getAllBlogCategory: build.query({
      query: (data) => ({
        url: `${blog_category}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog_category],
    }),

    // Query for fetching a single BlogCategory by its ID
    getSingleBlogCategory: build.query({
      query: (id) => ({
        url: `${blog_category}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blog_category],
    }),

    // Mutation for updating a single BlogCategory by its ID
    updateBlogCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `${blog_category}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.blog_category],
    }),

    // Mutation for deleting a BlogCategory by its ID
    deleteBlogCategory: build.mutation({
      query: (id) => ({
        url: `${blog_category}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blog_category],
    }),
  }),
});

export const {
  useCreateBlogCategoryMutation,
  useGetAllBlogCategoryQuery,
  useGetSingleBlogCategoryQuery,
  useUpdateBlogCategoryMutation,
  useDeleteBlogCategoryMutation,
} = blogCategoryApi;
