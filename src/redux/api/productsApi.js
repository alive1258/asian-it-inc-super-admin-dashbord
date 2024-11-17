import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const products = "/products";

export const productsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  Product
    createProduct: build.mutation({
      query: (data) => ({
        url: `${products}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.products],
    }),

    // Query for fetching all Product
    getAllProduct: build.query({
      query: (data) => ({
        url: `${products}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),

    // Query for fetching a single Product by its ID
    getSingleProduct: build.query({
      query: (id) => ({
        url: `${products}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.products],
    }),

    // Mutation for updating a single Product by its ID
    updateProduct: build.mutation({
      query: ({ id, data }) => ({
        url: `${products}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.products],
    }),

    // Mutation for deleting a Product by its ID
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${products}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.products],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
