import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Mutation for login
    signIn: builder.mutation({
      query: (data) => ({
        url: "/auth/sign-in",
        method: "POST",
        data,
      }),
      providesTags: [tagTypes.auth],
    }),
    signOut: builder.mutation({
      query: () => ({
        url: "/auth/sign-out",
        method: "POST",
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    verifyOTP: builder.mutation({
      query: (data) => ({
        url: "/auth/verifyOTP",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    resendOTP: builder.mutation({
      query: (data) => ({
        url: `/auth/resendOTP`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    forgetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.auth],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignOutMutation,
  useForgetPasswordMutation,
  useResendOTPMutation,
  useVerifyOTPMutation,
  useResetPasswordMutation,
} = authApi;
