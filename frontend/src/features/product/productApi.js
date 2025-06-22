// src/features/product/productApi.js
import { apiSlice } from "../api/apiSlice";

const productApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/product/getproducts",
      transformResponse: (response) => response.data,
      providesTags: ["Product"],
    }),

    getSingleProduct: builder.query({
      query: (productid) => `/product/getproduct/${productid}`,
      providesTags: ["Product"],
    }),

    addProduct: builder.mutation({
      query: (formData) => ({
        url: "/product/addproduct",
        method: "POST",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useAddProductMutation,
  useGetSingleProductQuery,
} = productApi;
