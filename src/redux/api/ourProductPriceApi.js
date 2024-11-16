import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const our_product_price = "/our-product-price";

export const ourProductPriceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  our_product_prices
    createOurProductPrice: build.mutation({
      query: (data) => ({
        url: `${our_product_price}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.our_product_price],
    }),

    // Query for fetching all our_product_prices
    getAllOurProductPrice: build.query({
      query: (data) => ({
        url: `${our_product_price}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.our_product_price],
    }),

    // Query for fetching a single our_product_prices by its ID
    getSingleOurProductPrice: build.query({
      query: (id) => ({
        url: `${our_product_price}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.our_product_price],
    }),

    // Mutation for updating a single our_product_prices by its ID
    updateOurProductPrice: build.mutation({
      query: ({ id, data }) => ({
        url: `${our_product_price}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.our_product_price],
    }),

    // Mutation for deleting a our_product_prices by its ID
    deleteOurProductPrice: build.mutation({
      query: (id) => ({
        url: `${our_product_price}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.our_product_price],
    }),
  }),
});

export const {
  useCreateOurProductPriceMutation,
  useGetAllOurProductPriceQuery,
  useGetSingleOurProductPriceQuery,
  useUpdateOurProductPriceMutation,
  useDeleteOurProductPriceMutation,
} = ourProductPriceApi;
