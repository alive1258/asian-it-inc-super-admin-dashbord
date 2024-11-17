import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const product_top_category = "/product-top-category";

export const productTopCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  Product
    createProductTopCategory: build.mutation({
      query: (data) => ({
        url: `${product_top_category}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.product_top_category],
    }),

    // Query for fetching all Product
    getAllProductTopCategory: build.query({
      query: (data) => ({
        url: `${product_top_category}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product_top_category],
    }),

    // Query for fetching a single Product by its ID
    getSingleProductTopCategory: build.query({
      query: (id) => ({
        url: `${product_top_category}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product_top_category],
    }),

    // Mutation for updating a single Product by its ID
    updateProductTopCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `${product_top_category}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.product_top_category],
    }),

    // Mutation for deleting a Product by its ID
    deleteProductTopCategory: build.mutation({
      query: (id) => ({
        url: `${product_top_category}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product_top_category],
    }),
  }),
});

export const {
  useCreateProductTopCategoryMutation,
  useGetAllProductTopCategoryQuery,
  useGetSingleProductTopCategoryQuery,
  useUpdateProductTopCategoryMutation,
  useDeleteProductTopCategoryMutation,
} = productTopCategoryApi;
