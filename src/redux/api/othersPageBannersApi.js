import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const hero_banner = "/hero-banner";

export const othersPageBannersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  hero_banners
    createHeroBanner: build.mutation({
      query: (data) => ({
        url: `${hero_banner}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.hero_banner],
    }),

    // Query for fetching all hero_banners
    getAllHeroBanner: build.query({
      query: (data) => ({
        url: `${hero_banner}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.hero_banner],
    }),

    // Query for fetching a single hero_banners by its ID
    getSingleHeroBanner: build.query({
      query: (id) => ({
        url: `${hero_banner}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.hero_banner],
    }),

    // Mutation for updating a single hero_banners by its ID
    updateHeroBanner: build.mutation({
      query: ({ id, data }) => ({
        url: `${hero_banner}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.hero_banner],
    }),

    // Mutation for deleting a hero_banners by its ID
    deleteHeroBanner: build.mutation({
      query: (id) => ({
        url: `${hero_banner}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.hero_banner],
    }),
  }),
});

export const {
  useCreateHeroBannerMutation,
  useGetAllHeroBannerQuery,
  useGetSingleHeroBannerQuery,
  useUpdateHeroBannerMutation,
  useDeleteHeroBannerMutation,
} = othersPageBannersApi;
