import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { clearCart, removeFromCart, updateCartItemQuantity } from "../../redux/features/cart/cartSlice";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    console.log(cartItems);
    // Định dạng số tiền theo VND
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        }).format(amount);
    };

    // Tính tổng tiền
    const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

    const handleRemoveFromCart = (product) => {
        dispatch(removeFromCart(product));
    };

    const handleClearCart = () => {
        dispatch(clearCart());
    };

    const handleQuantityChange = (product, quantity) => {
        if (quantity > 0) {
            dispatch(updateCartItemQuantity({ id: product.id, quantity: parseInt(quantity) }));
        }
    };

    return (
        <div className="flex mt-12 h-full flex-col overflow-hidden bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                    <div className="text-lg font-medium text-gray-900">Giỏ hàng</div>
                    <div className="ml-3 flex h-7 items-center">
                        <button
                            type="button"
                            onClick={handleClearCart}
                            className="relative -m-2 py-1 px-2 bg-red-500 text-white rounded-md hover:bg-secondary transition-all duration-200"
                        >
                            <span>Xoá tất cả</span>
                        </button>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flow-root">
                        {cartItems.length > 0 ? (
                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                {cartItems.map((product) => (
                                    <li key={product.id} className="flex py-6">
                                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                            <img
                                                alt={product.title}
                                                src={product.coverImage?.startsWith("data:") ? product.coverImage : getImgUrl(product.coverImage)}
                                                className="h-full w-full object-cover object-center"
                                            />
                                        </div>
                                        <div className="ml-4 flex flex-1 flex-col">
                                            <div>
                                                <div className="flex flex-wrap justify-between text-base font-medium text-gray-900">
                                                    <h3>
                                                        <Link to={`/books/${product.id}`}>{product.title}</Link>
                                                    </h3>
                                                    <p className="sm:ml-4">{formatCurrency(product.totalPrice)}</p>
                                                </div>
                                               
                                            </div>
                                            <div className="flex flex-1 flex-wrap items-end justify-between space-y-2 text-sm">
                                                <div className="flex items-center">
                                                    <label htmlFor={`quantity-${product.id}`} className="mr-2">
                                                        <strong>Số lượng:</strong>
                                                    </label>
                                                    <input
                                                        type="number"
                                                        id={`quantity-${product.id}`}
                                                        value={product.quantity}
                                                        min="1"
                                                        onChange={(e) => handleQuantityChange(product, e.target.value)}
                                                        className="w-16 border rounded-md px-2 py-1"
                                                    />
                                                </div>
                                                <div className="flex">
                                                    <button
                                                        onClick={() => handleRemoveFromCart(product)}
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                    >
                                                        Xoá
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Không có sản phẩm nào trong giỏ hàng!</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Tạm tính</p>
                    <p>{formatCurrency(totalPrice)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Phí vận chuyển và thuế sẽ được tính khi thanh toán.</p>
                <div className="mt-6">
                    <Link
                        to="/checkout"
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                        Thanh toán
                    </Link>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <Link to="/">
                        hoặc
                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
                            Tiếp tục mua sắm
                            <span aria-hidden="true"> →</span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
