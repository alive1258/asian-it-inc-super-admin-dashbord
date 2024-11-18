import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const about = "/about";

export const aboutApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  about
    createOrUpdateAbout: build.mutation({
      query: (data) => ({
        url: `${about}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.about],
    }),

    // Query for fetching a single about by its ID
    getAbout: build.query({
      query: () => ({
        url: `${about}`,
        method: "GET",
      }),
      providesTags: [tagTypes.about],
    }),
  }),
});

export const {
  useCreateOrUpdateAboutMutation,
  useGetAboutQuery,
} = aboutApi;
