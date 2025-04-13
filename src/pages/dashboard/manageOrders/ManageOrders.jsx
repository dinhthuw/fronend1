import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineEye, HiOutlineTrash } from "react-icons/hi";
import Swal from "sweetalert2";

const ManageOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderDetails, setShowOrderDetails] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "https://back1-3byw.onrender.com";

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) throw new Error("Không tìm thấy token xác thực");

            const response = await axios.get(`${API_URL}/api/orders`);
            setOrders(response.data);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách đơn hàng:", error);
            if (error.response?.status === 401) {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi xác thực",
                    text: "Vui lòng đăng nhập lại để tiếp tục",
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("token");
                        window.location.href = "/admin/login";
                    }
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Lỗi",
                    text: "Không thể lấy danh sách đơn hàng",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const fetchOrderDetails = async (orderId) => {
        try {
            const response = await axios.get(`${API_URL}/api/orders/${orderId}`);
            setSelectedOrder(response.data);
            setShowOrderDetails(true);
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết đơn hàng:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Không thể lấy chi tiết đơn hàng",
            });
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status: newStatus });
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Cập nhật trạng thái đơn hàng thành công",
            });
            fetchOrders();
            if (selectedOrder && selectedOrder._id === orderId) {
                fetchOrderDetails(orderId);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: error.response?.status === 401 ? "Vui lòng đăng nhập lại" : "Không thể cập nhật trạng thái đơn hàng",
            }).then((result) => {
                if (error.response?.status === 401 && result.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = "/admin/login";
                }
            });
        }
    };

    const handlePaymentStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`${API_URL}/api/orders/${orderId}/payment`, { paymentStatus: newStatus });
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Cập nhật trạng thái thanh toán thành công",
            });
            fetchOrders();
            if (selectedOrder && selectedOrder._id === orderId) {
                fetchOrderDetails(orderId);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái thanh toán:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Không thể cập nhật trạng thái thanh toán",
            });
        }
    };

    const handleDelete = async (orderId) => {
        try {
            const result = await Swal.fire({
                title: "Bạn có chắc chắn?",
                text: "Hành động này không thể hoàn tác!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Có, xóa nó!",
                cancelButtonText: "Hủy",
            });

            if (result.isConfirmed) {
                await axios.delete(`${API_URL}/api/orders/${orderId}`);
                Swal.fire("Đã xóa!", "Đơn hàng đã được xóa.", "success");
                fetchOrders();
                if (selectedOrder && selectedOrder._id === orderId) {
                    setSelectedOrder(null);
                    setShowOrderDetails(false);
                }
            }
        } catch (error) {
            console.error("Lỗi khi xóa đơn hàng:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: error.response?.status === 401 ? "Vui lòng đăng nhập lại" : "Không thể xóa đơn hàng",
            }).then((result) => {
                if (error.response?.status === 401 && result.isConfirmed) {
                    localStorage.removeItem("token");
                    window.location.href = "/admin/login";
                }
            });
        }
    };

    const getPaymentMethodLabel = (method) => {
        const methods = {
            cod: "Thanh toán khi nhận hàng",
            banking: "Chuyển khoản ngân hàng",
            momo: "Ví MoMo",
            zalopay: "ZaloPay",
            vnpay: "VNPay",
            paypal: "PayPal",
        };
        return methods[method] || method;
    };

    const getStatusLabel = (status) => {
        const statuses = {
            pending: "Chờ xử lý",
            processing: "Đang xử lý",
            shipped: "Đã gửi hàng",
            delivered: "Đã giao hàng",
            cancelled: "Đã hủy",
        };
        return statuses[status] || status;
    };

    const getPaymentStatusLabel = (status) => {
        const statuses = {
            pending: "Chờ thanh toán",
            paid: "Đã thanh toán",
            failed: "Thanh toán thất bại",
            refunded: "Đã hoàn tiền",
        };
        return statuses[status] || status;
    };

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            processing: "bg-blue-100 text-blue-800",
            shipped: "bg-purple-100 text-purple-800",
            delivered: "bg-green-100 text-green-800",
            cancelled: "bg-red-100 text-red-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const getPaymentStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-800",
            paid: "bg-green-100 text-green-800",
            failed: "bg-red-100 text-red-800",
            refunded: "bg-purple-100 text-purple-800",
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Quản lý đơn hàng</h2>

            <div className="relative">
                {/* Orders Table */}
                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mã đơn hàng</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khách hàng</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tổng tiền</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phương thức</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đặt</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm text-gray-600">{order._id.substring(0, 8)}...</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">{order.name || "N/A"}</td>
                                        <td className="px-4 py-3 text-sm text-gray-900">
                                            {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(order.totalPrice)}
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{getPaymentMethodLabel(order.paymentMethod || "cod")}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status || "pending")}`}>
                                                {getStatusLabel(order.status || "pending")}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString("vi-VN")}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex space-x-3">
                                                <button
                                                    onClick={() => fetchOrderDetails(order._id)}
                                                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                                                    title="Xem chi tiết"
                                                >
                                                    <HiOutlineEye className="h-5 w-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(order._id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                    title="Xóa đơn hàng"
                                                >
                                                    <HiOutlineTrash className="h-5 w-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Order Details Sidebar */}
                {showOrderDetails && selectedOrder && (
                    <div
                        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ${showOrderDetails ? "translate-x-0" : "translate-x-full"
                            } z-50 overflow-y-auto`}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-semibold text-gray-800">Chi tiết đơn hàng</h3>
                                <button onClick={() => setShowOrderDetails(false)} className="text-gray-500 hover:text-gray-700 text-2xl">
                                    &times;
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-medium text-gray-500">Mã đơn hàng</p>
                                    <p className="mt-1 text-sm text-gray-900 truncate">{selectedOrder._id}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Thông tin khách hàng</p>
                                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.name || "N/A"}</p>
                                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.email || "N/A"}</p>
                                    <p className="mt-1 text-sm text-gray-900">{selectedOrder.phone || "N/A"}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Địa chỉ giao hàng</p>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {selectedOrder.address?.fullAddress}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Phương thức thanh toán</p>
                                    <p className="mt-1 text-sm text-gray-900">{getPaymentMethodLabel(selectedOrder.paymentMethod || "cod")}</p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Trạng thái đơn hàng</p>
                                    <select
                                        value={selectedOrder.status || "pending"}
                                        onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        {["pending", "processing", "shipped", "delivered", "cancelled"].map((status) => (
                                            <option key={status} value={status}>
                                                {getStatusLabel(status)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Trạng thái thanh toán</p>
                                    <select
                                        value={selectedOrder.paymentStatus || "pending"}
                                        onChange={(e) => handlePaymentStatusChange(selectedOrder._id, e.target.value)}
                                        className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        {["pending", "paid", "failed", "refunded"].map((status) => (
                                            <option key={status} value={status}>
                                                {getPaymentStatusLabel(status)}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Tổng tiền</p>
                                    <p className="mt-1 text-sm font-semibold text-gray-900">
                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(selectedOrder.totalPrice)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Sản phẩm</p>
                                    <div className="mt-2 space-y-3">
                                        {selectedOrder.products && selectedOrder.products.length > 0 ? (
                                            selectedOrder.products.map((item, index) => (
                                                <div key={index} className="flex justify-between p-3 bg-gray-50 rounded-md">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">{item.product?.title || "Sản phẩm không xác định"}</p>
                                                        <p className="text-xs text-gray-500">SL: {item.quantity}</p>
                                                    </div>
                                                    <p className="text-sm text-gray-900">
                                                        {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(item.price * item.quantity)}
                                                    </p>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-sm text-gray-500">Không có thông tin chi tiết sản phẩm</p>
                                        )}
                                    </div>
                                </div>

                                {selectedOrder.paymentDetails && (
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Thông tin thanh toán</p>
                                        {selectedOrder.paymentDetails.transactionId && (
                                            <p className="mt-1 text-sm text-gray-900">Mã giao dịch: {selectedOrder.paymentDetails.transactionId}</p>
                                        )}
                                        {selectedOrder.paymentDetails.paymentDate && (
                                            <p className="mt-1 text-sm text-gray-900">
                                                Ngày thanh toán: {new Date(selectedOrder.paymentDetails.paymentDate).toLocaleString("vi-VN")}
                                            </p>
                                        )}
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm font-medium text-gray-500">Ngày đặt hàng</p>
                                    <p className="mt-1 text-sm text-gray-900">{new Date(selectedOrder.createdAt).toLocaleString("vi-VN")}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Overlay for Sidebar */}
                {showOrderDetails && (
                    <div
                        className="fixed inset-0  bg-opacity-50 z-40"
                        onClick={() => setShowOrderDetails(false)}
                    ></div>
                )}
            </div>
        </div>
    );
};

export default ManageOrders;