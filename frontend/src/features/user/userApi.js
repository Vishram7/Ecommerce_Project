import { apiSlice } from '../api/apiSlice'

const userApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        loginUser: builder.mutation({
            query: (userData) => ({
                url: '/user/login',
                method: 'POST',
                body: userData
            })
        }),

        registerUser: builder.mutation({
            query: (userData) => ({
                url: '/user/register',
                method: 'POST',
                body: userData
            })
        })

    })
})

export const { useLoginUserMutation, useRegisterUserMutation } = userApi