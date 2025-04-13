import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
    cartItems: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const { id, quantity = 1, ...rest } = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);

            if (!existingItem) {
                state.cartItems.push({
                    ...rest,
                    id,
                    quantity,
                    totalPrice: rest.price * quantity, // Calculate total price for the item
                });
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Sản phẩm đã được thêm vào giỏ hàng",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                existingItem.quantity += quantity;
                existingItem.totalPrice = existingItem.price * existingItem.quantity; // Update total price
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Số lượng sản phẩm đã được cập nhật",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        },
        updateCartItemQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            if (existingItem && quantity > 0) {
                existingItem.quantity = quantity;
                existingItem.totalPrice = existingItem.price * quantity; // Update total price
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((item) => item.id !== action.payload.id);
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
    },
});

export const { addToCart, updateCartItemQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;