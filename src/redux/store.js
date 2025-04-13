import { configureStore } from '@reduxjs/toolkit'
import { booksApi } from './features/books/booksApi'
import { categoriesApi } from './features/categories/categoriesApi'
import ordersApi from './features/orders/ordersApi'
import authReducer from './features/auth/authSlice'
import cartReducer from './features/cart/cartSlice'
import categoryReducer from './slices/categorySlice'

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    auth: authReducer,
    cart: cartReducer,
    categories: categoryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      booksApi.middleware,
      categoriesApi.middleware,
      ordersApi.middleware
    ),
})