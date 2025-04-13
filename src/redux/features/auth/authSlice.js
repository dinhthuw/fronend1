import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, { payload }) => {
        state.user = payload.user
        state.token = payload.token
        state.isAuthenticated = true
        localStorage.setItem('token', payload.token)
    },
        logout: (state) => {
            state.user = null
            state.token = null
            state.isAuthenticated = false
            localStorage.removeItem('token')
        },
        setLoading: (state, { payload }) => {
            state.isLoading = payload
        },
        setError: (state, { payload }) => {
            state.error = payload
        },
        clearError: (state) => {
            state.error = null
        }
    }
})

export const { setCredentials, logout, setLoading, setError, clearError } = authSlice.actions

export default authSlice.reducer 