import { apiSlice } from "../api/apiSlice";

const cartApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => "/cart/getcart",
      transformResponse: (response) => response.data,
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (product) => ({
        url: "/cart/addtocart",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (product) => ({
        url: "/cart/removefromcart",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Cart"],
    }),

    updateQuantity: builder.mutation({
      query: ({ productid, quantity }) => ({
        url: "/cart/updatequantity",
        method: "POST",
        body: { productid, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateQuantityMutation,
} = cartApi;
