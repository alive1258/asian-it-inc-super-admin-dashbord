import { instance as axiosInstance } from "./axiosInstance";

// Function to create a base axios query
export const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: process.env.NEXT_PUBLIC_API_URL }) =>
  // Async function to execute the axios query
  async ({ url, method, data, params, headers, contentType }) => {
    try {
      // console.log("params", params);
      // Execute the axios instance with provided parameters
      const result = await axiosInstance({
        // Concatenate baseUrl with provided url
        url: baseUrl + url,
        // HTTP method (GET, POST, PUT, DELETE, etc.)
        method,
        // Data to be sent with the request
        data,
        // URL parameters
        params,

        //headers
        headers: {
          ...headers,
          // Set Content-Type header, defaulting to "application/json" if not provided
          "Content-Type": contentType || "application/json",
        },
        withCredentials: true,
        // meta use pagination limit ,pageNumber,totalData
      });

      // Ensure to return only the data property
      return { data: result.data };
    } catch (axiosError) {
      return {
        error: {
          // Use status code from response or default to 500
          status: axiosError?.status || 500,
          // Use response data or fallback to generic error message
          message: axiosError?.message || "An unexpected error occurred",
        },
      };
    }
  };
