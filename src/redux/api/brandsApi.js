import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const brands = "/brands";

export const brandsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  brand
    createBrand: build.mutation({
      query: (data) => ({
        url: `${brands}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.brand],
    }),

    // Query for fetching all brand
    getAllBrand: build.query({
      query: (data) => ({
        url: `${brands}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.brand],
    }),

    // Query for fetching a single brand by its ID
    getSingleBrand: build.query({
      query: (id) => ({
        url: `${brands}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.brand],
    }),

    // Mutation for updating a single brand by its ID
    updateBrand: build.mutation({
      query: ({ id, data }) => ({
        url: `${brands}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.brand],
    }),

    // Mutation for deleting a brand by its ID
    deleteBrand: build.mutation({
      query: (id) => ({
        url: `${brands}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.brand],
    }),
  }),
});

export const {
  useCreateBrandMutation,
  useGetAllBrandQuery,
  useGetSingleBrandQuery,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandsApi;
