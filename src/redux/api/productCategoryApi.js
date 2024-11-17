import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const product_category = "/product-category";

export const productCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  product_categorys
    createOurProductPrice: build.mutation({
      query: (data) => ({
        url: `${product_category}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.product_category],
    }),

    // Query for fetching all product_categorys
    getAllOurProductPrice: build.query({
      query: (data) => ({
        url: `${product_category}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product_category],
    }),

    // Query for fetching a single product_categorys by its ID
    getSingleOurProductPrice: build.query({
      query: (id) => ({
        url: `${product_category}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.product_category],
    }),

    // Mutation for updating a single product_categorys by its ID
    updateOurProductPrice: build.mutation({
      query: ({ id, data }) => ({
        url: `${product_category}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.product_category],
    }),

    // Mutation for deleting a product_categorys by its ID
    deleteOurProductPrice: build.mutation({
      query: (id) => ({
        url: `${product_category}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.product_category],
    }),
  }),
});

export const {
  useCreateOurProductPriceMutation,
  useGetAllOurProductPriceQuery,
  useGetSingleOurProductPriceQuery,
  useUpdateOurProductPriceMutation,
  useDeleteOurProductPriceMutation,
} = productCategoryApi;
