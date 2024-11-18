import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const blogs = "/blogs";

export const blogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  Blogs
    createBlogs: build.mutation({
      query: (data) => ({
        url: `${blogs}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.blogs],
    }),

    // Query for fetching all Blogs
    getAllBlogs: build.query({
      query: (data) => ({
        url: `${blogs}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs],
    }),

    // Query for fetching a single Blogs by its ID
    getSingleBlogs: build.query({
      query: (id) => ({
        url: `${blogs}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.blogs],
    }),

    // Mutation for updating a single Blogs by its ID
    updateBlogs: build.mutation({
      query: ({ id, data }) => ({
        url: `${blogs}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.blogs],
    }),

    // Mutation for deleting a Blogs by its ID
    deleteBlogs: build.mutation({
      query: (id) => ({
        url: `${blogs}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.blogs],
    }),
  }),
});

export const {
  useCreateBlogsMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogsQuery,
  useUpdateBlogsMutation,
  useDeleteBlogsMutation,
} = blogApi;
