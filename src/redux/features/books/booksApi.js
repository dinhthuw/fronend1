import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: 'https://back1-3byw.onrender.com/api',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('authorization', `Bearer ${token}`)
            }
            headers.set('Content-Type', 'application/json')
            headers.set('Accept', 'application/json')
            return headers
        }
    }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => 'books',
            providesTags: ['Books']
        }),
        getSingleBook: builder.query({
            query: (id) => `books/${id}`,
            providesTags: ['Books']
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
                url: 'books',
                method: 'POST',
                body: bookData,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }),
            invalidatesTags: ['Books']
        }),
        updateBook: builder.mutation({
            query: ({ id, book }) => ({
                url: `books/${id}`,
                method: 'PUT',
                body: book
            }),
            invalidatesTags: ['Books']
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `books/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Books']
        })
    })
})

export const {
    useGetAllBooksQuery,
    useGetSingleBookQuery,
    useCreateBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = booksApi