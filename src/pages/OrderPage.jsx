import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchOrderByIdQuery } from '../redux/features/orders/ordersApi';
import { useGetUserQuery } from '../redux/features/auth/authApi';
import { useDispatch } from 'react-redux';
import { clearCart } from '../redux/features/cart/cartSlice';
import { toast } from 'react-hot-toast';

const OrderPage = () => {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const { data: order, isLoading: orderLoading, error: orderError } = useFetchOrderByIdQuery(orderId);
    const { data: user, isLoading: userLoading } = useGetUserQuery();
    console.log({order});
    useEffect(() => {
        if (order) {
            dispatch(clearCart());
            toast.success('Đơn hàng đã được xác nhận!');
        }
    }, [order, dispatch]);

    const getPaymentMethodLabel = (method) => {
        const methods = {
            'cod': 'Thanh toán khi nhận hàng',
            'vnpay': 'VNPay'
        };
        return methods[method] || method;
    };

    const getStatusLabel = (status) => {
        const statuses = {
            'pending': 'Chờ xử lý',
            'processing': 'Đang xử lý',
            'shipped': 'Đã gửi hàng',
            'delivered': 'Đã giao hàng',
            'cancelled': 'Đã hủy'
        };
        return statuses[status] || status;
    };

    const getPaymentStatusLabel = (status) => {
        const statuses = {
            'pending': 'Chờ thanh toán',
            'paid': 'Đã thanh toán',
            'failed': 'Thanh toán thất bại',
            'refunded': 'Đã hoàn tiền'
        };
        return statuses[status] || status;
    };

    const getStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'processing': 'bg-blue-100 text-blue-800',
            'shipped': 'bg-purple-100 text-purple-800',
            'delivered': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    const getPaymentStatusColor = (status) => {
        const colors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'paid': 'bg-green-100 text-green-800',
            'failed': 'bg-red-100 text-red-800',
            'refunded': 'bg-purple-100 text-purple-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    if (orderLoading || userLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (orderError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500 text-center">
                    <h2 className="text-2xl font-bold mb-4">Có lỗi xảy ra</h2>
                    <p>Không thể tải thông tin đơn hàng. Vui lòng thử lại sau.</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Không tìm thấy đơn hàng</h2>
                    <p>Đơn hàng này không tồn tại hoặc đã bị hủy.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Chi tiết đơn hàng #{order._id}</h1>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Thông tin đơn hàng</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Ngày đặt:</p>
                            <p className="font-medium">{new Date(order.createdAt).toLocaleDateString('vi-VN')}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Trạng thái đơn hàng:</p>
                            <p className={`font-medium px-2 py-1 rounded-full inline-flex ${getStatusColor(order.status)}`}>
                                {getStatusLabel(order.status)}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-600">Tổng tiền:</p>
                            <p className="font-medium">{order.totalPrice?.toLocaleString('vi-VN')}đ</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Phương thức thanh toán:</p>
                            <p className="font-medium">{getPaymentMethodLabel(order.paymentMethod)}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Trạng thái thanh toán:</p>
                            <p className={`font-medium px-2 py-1 rounded-full inline-flex ${getPaymentStatusColor(order.paymentStatus)}`}>
                                {getPaymentStatusLabel(order.paymentStatus)}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Thông tin người nhận</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-gray-600">Họ tên:</p>
                            <p className="font-medium">{order.name}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Email:</p>
                            <p className="font-medium">{order.email}</p>
                        </div>
                        <div>
                            <p className="text-gray-600">Số điện thoại:</p>
                            <p className="font-medium">{order.phone}</p>
                        </div>
                        <div className="col-span-2">
                            <p className="text-gray-600">Địa chỉ:</p>
                            <p className="font-medium">
                                {order.address?.fullAddress}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Sản phẩm đã đặt</h2>
                    <div className="space-y-4">
                        {order.products && order.products.length > 0 ? (
                            order.products.map((item, index) => (
                                <div key={index} className="flex items-center border-b pb-4">
                                    <img
                                        src={item.product?.coverImage || '/placeholder-book.png'}
                                        alt={item.product?.title || 'Sản phẩm'}
                                        className="w-20 h-20 object-cover rounded"
                                    />
                                    <div className="ml-4 flex-1">
                                        <h3 className="font-medium">{item.product?.title || 'Sản phẩm không xác định'}</h3>
                                        <p className="text-gray-600">Số lượng: {item.quantity}</p>
                                        <p className="text-gray-600">Giá: {item.price?.toLocaleString('vi-VN') || '0'}đ</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500">Không có thông tin chi tiết sản phẩm</p>
                        )}
                    </div>

                    <div className="mt-6 border-t pt-4">
                        <div className="flex justify-between items-center">
                            <span className="font-semibold">Tổng cộng:</span>
                            <span className="font-bold text-lg">{order.totalPrice?.toLocaleString('vi-VN')}đ</span>
                        </div>
                    </div>
                </div>

                {order.paymentDetails && (
                    <div className="bg-white rounded-lg shadow-md p-6 mt-6">
                        <h2 className="text-xl font-semibold mb-4">Thông tin thanh toán</h2>
                        <div className="grid grid-cols-2 gap-4">
                            {order.paymentDetails.transactionId && (
                                <div>
                                    <p className="text-gray-600">Mã giao dịch:</p>
                                    <p className="font-medium">{order.paymentDetails.transactionId}</p>
                                </div>
                            )}
                            {order.paymentDetails.paymentDate && (
                                <div>
                                    <p className="text-gray-600">Ngày thanh toán:</p>
                                    <p className="font-medium">{new Date(order.paymentDetails.paymentDate).toLocaleDateString('vi-VN')}</p>
                                </div>
                            )}
                            {order.paymentDetails.paymentProof && (
                                <div className="col-span-2">
                                    <p className="text-gray-600">Minh chứng thanh toán:</p>
                                    <a
                                        href={order.paymentDetails.paymentProof}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Xem minh chứng
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderPage;