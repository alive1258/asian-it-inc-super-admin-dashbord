import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const testimonial = "/testimonial";

export const testimonialApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Mutation for creating a new  testimonials
    createTestimonial: build.mutation({
      query: (data) => ({
        url: `${testimonial}`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),

    // Query for fetching all testimonials
    getAllTestimonial: build.query({
      query: (data) => ({
        url: `${testimonial}/by-admin?limit=${data?.limit}&page=${data.page}&search=${data?.search}`,
        method: "GET",
      }),
      providesTags: [tagTypes.testimonial],
    }),

    // Query for fetching a single testimonials by its ID
    getSingleTestimonial: build.query({
      query: (id) => ({
        url: `${testimonial}/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.testimonial],
    }),

    // Mutation for updating a single testimonials by its ID
    updateTestimonial: build.mutation({
      query: ({ id, data }) => ({
        url: `${testimonial}/${id}`,
        method: "PUT",
        data,
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),

    // Mutation for deleting a testimonials by its ID
    deleteTestimonial: build.mutation({
      query: (id) => ({
        url: `${testimonial}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.testimonial],
    }),
  }),
});

export const {
  useCreateTestimonialMutation,
  useGetAllTestimonialQuery,
  useGetSingleTestimonialQuery,
  useUpdateTestimonialMutation,
  useDeleteTestimonialMutation,
} = testimonialApi;
