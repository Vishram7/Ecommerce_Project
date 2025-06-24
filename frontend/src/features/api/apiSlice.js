import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { navigateTo } from "../../utils/navigation";
import { useDispatch } from "react-redux";
// import { logoutFromApi } from "../../utils/logout";



const VITE_BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: VITE_BACKEND_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});




export const customBaseQueryWithRedirect = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  // console.log(result, "result from base query");
  

  if (result?.error?.status === 401) {
    localStorage.removeItem("authToken");
    // useDispatch(apiSlice.util.resetApiState());
    navigateTo("/login");
    // logoutFromApi()
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQueryWithRedirect,
  tagTypes: ["User", "Cart", "Product", "Order"],
  endpoints: () => ({}),
});

