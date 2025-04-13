import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseURL';

const ordersApi = createApi({
    reducerPath: 'ordersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: `${getBaseUrl()}/api`,
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
                headers.set('Content-Type', 'application/json');
                headers.set('Accept', 'application/json');
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        fetchAllOrders: builder.query({
            query: () => '/orders',
            providesTags: ['Orders']
        }),
        fetchOrderById: builder.query({
            query: (id) => `/orders/${id}`,
            providesTags: ['Orders']
        }),
        getOrderByEmail: builder.query({
            query: (email) => `/orders/email/${email}`,
            providesTags: ['Orders']
        }),
        createOrder: builder.mutation({
            query: (order) => ({
                url: '/orders',
                method: 'POST',
                body: order,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }),
            invalidatesTags: ['Orders']
        }),
        updateOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/orders/${id}/status`,
                method: 'PUT',
                body: { status },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }),
            invalidatesTags: ['Orders']
        }),
        updatePaymentStatus: builder.mutation({
            query: ({ id, paymentStatus, paymentDetails }) => ({
                url: `/orders/${id}/payment`,
                method: 'PUT',
                body: { paymentStatus, paymentDetails },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }),
            invalidatesTags: ['Orders']
        }),
        deleteOrder: builder.mutation({
            query: (id) => ({
                url: `/orders/${id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }),
            invalidatesTags: ['Orders']
        })
    })
})

export const {
    useFetchAllOrdersQuery,
    useFetchOrderByIdQuery,
    useGetOrderByEmailQuery,
    useCreateOrderMutation,
    useUpdateOrderStatusMutation,
    useUpdatePaymentStatusMutation,
    useDeleteOrderMutation
} = ordersApi

export default ordersApi;
