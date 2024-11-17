import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const terms_and_conditions = "/terms-and-conditions";

export const termsAndConditionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  service
    createOrUpdateTermsAndCondition: build.mutation({
      query: (data) => ({
        url: `${terms_and_conditions}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.terms_and_conditions],
    }),

    // Query for fetching a single service by its ID
    getTermsAndConditions: build.query({
      query: (id) => ({
        url: `${terms_and_conditions}`,
        method: "GET",
      }),
      providesTags: [tagTypes.terms_and_conditions],
    }),
  }),
});

export const {
  useCreateOrUpdateTermsAndConditionMutation,
  useGetTermsAndConditionsQuery,
} = termsAndConditionApi;
