import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL';

export const categoriesApi = createApi({
    reducerPath: 'categoriesApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${getBaseUrl()}/api` }),
    endpoints: (builder) => ({
        fetchAllCategories: builder.query({
            query: () => '/categories',
            providesTags: ['Categories']
        }),
        getCategoryById: builder.query({
            query: (id) => `/categories/${id}`,
            providesTags: ['Categories']
        }),
        createCategory: builder.mutation({
            query: (category) => ({
                url: '/categories',
                method: 'POST',
                body: category,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
            invalidatesTags: ['Categories']
        }),
        updateCategory: builder.mutation({
            query: ({ id, category }) => ({
                url: `/categories/${id}`,
                method: 'PUT',
                body: category,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
            invalidatesTags: ['Categories']
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/categories/${id}`,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            }),
            invalidatesTags: ['Categories']
        })
    })
})

export const {
    useFetchAllCategoriesQuery,
    useGetCategoryByIdQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoriesApi 