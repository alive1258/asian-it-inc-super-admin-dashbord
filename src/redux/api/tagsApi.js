import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const TAGS_URL = "/tags";

export const tagsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  tags
    createTags: build.mutation({
      query: (data) => ({
        url: `${TAGS_URL}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.tags],
    }),

    // Query for fetching all tags
    getAllTags: build.query({
      query: (arg) => ({
        url: `${TAGS_URL}`,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.tags],
    }),

    // Query for fetching a single tags by its ID
    getSingleTag: build.query({
      query: (id) => ({
        url: `${TAGS_URL}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.tags],
    }),

    // Mutation for updating a single tags by its ID
    updateTag: build.mutation({
      query: ({ id, data }) => ({
        url: `${TAGS_URL}/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.tags],
    }),

    // Mutation for deleting a tags by its ID
    deleteTag: build.mutation({
      query: (id) => ({
        url: `${TAGS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.tags],
    }),
  }),
});

export const {
  useCreateTagsMutation,
  useGetAllTagsQuery,
  useGetSingleTagQuery,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagsApi;
