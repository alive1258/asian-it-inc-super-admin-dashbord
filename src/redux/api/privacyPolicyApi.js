import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const privacy_policy = "/privacy-policy";

export const privacyPolicyApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  service
    createOrUpdatePrivacyPolicy: build.mutation({
      query: (data) => ({
        url: `${privacy_policy}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.privacy_policy],
    }),

    // Query for fetching a single service by its ID
    getPrivacyPolicy: build.query({
      query: () => ({
        url: `${privacy_policy}`,
        method: "GET",
      }),
      providesTags: [tagTypes.privacy_policy],
    }),
  }),
});

export const {
  useCreateOrUpdatePrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
} = privacyPolicyApi;
