import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const banners = "/banners";

export const bannersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  service
    createOrUpdateBanners: build.mutation({
      query: (data) => ({
        url: `${banners}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.banners],
    }),

    // Query for fetching a single service by its ID
    getBanners: build.query({
      query: () => ({
        url: `${banners}`,
        method: "GET",
      }),
      providesTags: [tagTypes.banners],
    }),
  }),
});

export const { useCreateOrUpdateBannersMutation, useGetBannersQuery } =
  bannersApi;
