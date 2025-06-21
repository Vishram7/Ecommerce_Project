import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: VITE_BACKEND_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  tagTypes: ["User", "Cart", "Product", "Order"],
  endpoints: () => ({}),
});
