import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const our_work = "/our-works";

export const ourWorkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  our_works
    createOurWork: build.mutation({
      query: (data) => ({
        url: `${our_work}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.our_work],
    }),

    // Query for fetching all our_works
    getAllOurWork: build.query({
      query: (data) => ({
        url: `${our_work}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.our_work],
    }),

    // Query for fetching a single our_works by its ID
    getSingleOurWork: build.query({
      query: (id) => ({
        url: `${our_work}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.our_work],
    }),

    // Mutation for updating a single our_works by its ID
    updateOurWork: build.mutation({
      query: ({ id, data }) => ({
        url: `${our_work}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.our_work],
    }),

    // Mutation for deleting a our_works by its ID
    deleteOurWork: build.mutation({
      query: (id) => ({
        url: `${our_work}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.our_work],
    }),
  }),
});

export const {
  useCreateOurWorkMutation,
  useGetAllOurWorkQuery,
  useGetSingleOurWorkQuery,
  useUpdateOurWorkMutation,
  useDeleteOurWorkMutation,
} = ourWorkApi;
