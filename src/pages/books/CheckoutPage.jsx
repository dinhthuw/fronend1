import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useCreateOrderMutation } from '../../redux/features/orders/ordersApi';
import { clearCart } from '../../redux/features/cart/cartSlice';

const CheckoutPage = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const subtotal = parseFloat(
        cartItems
            .reduce((acc, item) => {
                const itemPrice = item.newPrice || item.price || 0;
                return acc + itemPrice * (item.quantity || 1);
            }, 0)
            .toFixed(2)
    );

    const shippingFee = 30000;
    const totalPrice = parseFloat(subtotal + shippingFee);

    const [userData, setUserData] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const [isChecked, setIsChecked] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setValue,
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            phone: '',
            fullAddress: '',
            paymentMethod: 'cod',
        },
    });

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const watchPaymentMethod = watch('paymentMethod', 'cod');

    useEffect(() => {
        setPaymentMethod(watchPaymentMethod);
    }, [watchPaymentMethod]);

    // Lấy thông tin user từ localStorage và đồng bộ với form
    useEffect(() => {
        const userString = localStorage.getItem('user');
        if (userString) {
            try {
                const user = JSON.parse(userString);
                setUserData(user);
                // Đồng bộ dữ liệu với form
                setValue('name', user.name || '');
                setValue('email', user.email || '');
                setValue('phone', user.phone || '');
            } catch (error) {
                console.error('Lỗi khi parse dữ liệu user:', error);
                Swal.fire({
                    title: 'Lỗi',
                    text: 'Không thể tải thông tin tài khoản. Vui lòng đăng nhập lại.',
                    icon: 'error',
                    confirmButtonColor: '#d33',
                });
                navigate('/login');
            }
        } else {
            // Chuyển hướng đến trang đăng nhập nếu chưa đăng nhập
            Swal.fire({
                title: 'Yêu cầu đăng nhập',
                text: 'Vui lòng đăng nhập để tiếp tục thanh toán.',
                icon: 'warning',
                confirmButtonColor: '#3085d6',
            });
            navigate('/login');
        }
    }, [setValue, navigate]);

    const onSubmit = async (data) => {
        const productIds = cartItems.map((item) => item._id || item.id).filter((id) => id);

        if (productIds.length === 0) {
            Swal.fire({
                title: 'Lỗi',
                text: 'Không có sản phẩm trong giỏ hàng!',
                icon: 'error',
                confirmButtonColor: '#d33',
            });
            return;
        }

        const products = cartItems.map((item) => ({
            product: item._id || item.id,
            quantity: item.quantity || 1,
            price: item.newPrice || item.price || 0,
        }));

        let paymentDetailsData = null;
        if (data.paymentMethod !== 'cod') {
            paymentDetailsData = {
                transactionId: data.transactionId,
                paymentDate: new Date(),
                paymentProof: data.paymentProof,
            };
        }

        const newOrder = {
            user: userData?._id,
            name: data.name,
            email: userData?.email,
            address: {
                fullAddress: data.fullAddress,
            },
            phone: Number(data.phone),
            productIds: productIds,
            products: products,
            totalPrice: totalPrice,
            paymentMethod: data.paymentMethod,
            paymentDetails: paymentDetailsData,
        };

        try {
            const response = await createOrder(newOrder).unwrap();
            Swal.fire({
                title: 'Đặt hàng thành công',
                text: 'Đơn hàng của bạn đã được đặt thành công!',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            });
            dispatch(clearCart());
            navigate('/');
        } catch (error) {
            Swal.fire({
                title: 'Đặt hàng thất bại',
                text: error?.data?.message || 'Đã xảy ra lỗi!',
                icon: 'error',
                confirmButtonColor: '#d33',
            });
        }
    };

    const getPaymentMethodLabel = (method) => {
        const methods = {
            cod: 'Thanh toán khi nhận hàng',
            vnpay: 'VNPay',
        };
        return methods[method] || method;
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8">Thanh toán</h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Form thông tin mua hàng */}
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">Thông tin mua hàng</h3>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Họ tên
                                </label>
                                <input
                                    {...register('name', { required: 'Họ tên là bắt buộc' })}
                                    type="text"
                                    id="name"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-4"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    {...register('email')}
                                    type="text"
                                    id="email"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50 h-10 px-4"
                                    disabled
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                    Số điện thoại
                                </label>
                                <input
                                    {...register('phone', {
                                        required: 'Số điện thoại là bắt buộc',
                                        pattern: {
                                            value: /^[0-9]+$/,
                                            message: 'Vui lòng nhập số điện thoại hợp lệ',
                                        },
                                    })}
                                    type="text"
                                    id="phone"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-4"
                                    placeholder="0123456789"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                            </div>

                            <div>
                                <label htmlFor="fullAddress" className="block text-sm font-medium text-gray-700">
                                    Địa chỉ giao hàng
                                </label>
                                <textarea
                                    {...register('fullAddress', {
                                        required: 'Địa chỉ là bắt buộc',
                                        minLength: {
                                            value: 10,
                                            message: 'Địa chỉ phải có ít nhất 10 ký tự',
                                        },
                                    })}
                                    id="fullAddress"
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-20 px-4 py-2"
                                    placeholder="Nhập đầy đủ địa chỉ giao hàng (số nhà, đường, phường/xã, quận/huyện, tỉnh/thành phố)"
                                />
                                {errors.fullAddress && (
                                    <p className="text-red-500 text-xs mt-1">{errors.fullAddress.message}</p>
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                    onChange={(e) => setIsChecked(e.target.checked)}
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                                    Tôi đồng ý với{' '}
                                    <Link to="#" className="underline text-blue-600">
                                        Điều khoản & Điều kiện
                                    </Link>
                                    .
                                </label>
                            </div>
                        </form>
                    </div>

                    {/* Danh sách sản phẩm và phương thức thanh toán */}
                    <div className="space-y-8">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Đơn hàng của bạn</h3>
                            <div className="space-y-4">
                                {cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center border-b pb-4">
                                        <img
                                            src={item.coverImage || '/placeholder-book.png'}
                                            alt={item.title}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div className="ml-4 flex-1">
                                            <h4 className="font-medium text-gray-800">{item.title}</h4>
                                            <div className="flex justify-between mt-1">
                                                <p className="text-gray-600">Số lượng: {item.quantity || 1}</p>
                                                <p className="font-medium">
                                                    {((item.newPrice || item.price || 0) * (item.quantity || 1)).toLocaleString('vi-VN')}đ
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-4 border-t">
                                <div className="flex justify-between text-sm text-gray-600">
                                    <span>Tổng tiền sản phẩm</span>
                                    <span>{subtotal.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="flex justify-between text-sm text-gray-600 mt-2">
                                    <span>Phí vận chuyển</span>
                                    <span>{shippingFee.toLocaleString('vi-VN')}đ</span>
                                </div>
                                <div className="flex justify-between font-semibold text-lg mt-3">
                                    <span>Tổng thanh toán</span>
                                    <span>{(subtotal + shippingFee).toLocaleString('vi-VN')}đ</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-gray-700 mb-4">Phương thức thanh toán</h3>
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex items-center space-x-2">
                                        <input
                                            {...register('paymentMethod')}
                                            type="radio"
                                            id="cod"
                                            value="cod"
                                            defaultChecked
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <label htmlFor="cod" className="text-sm text-gray-700">
                                            Thanh toán khi nhận hàng
                                        </label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <input
                                            {...register('paymentMethod')}
                                            type="radio"
                                            id="vnpay"
                                            value="vnpay"
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                        />
                                        <label htmlFor="vnpay" className="text-sm text-gray-700">
                                            VNPay
                                        </label>
                                    </div>
                                </div>

                                {paymentMethod === 'vnpay' && (
                                    <div className="space-y-4 mt-4">
                                        <div>
                                            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700">
                                                Mã giao dịch VNPay
                                            </label>
                                            <input
                                                {...register('transactionId', {
                                                    required: 'Mã giao dịch là bắt buộc',
                                                })}
                                                type="text"
                                                id="transactionId"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-4"
                                                placeholder="Nhập mã giao dịch từ VNPay"
                                            />
                                            {errors.transactionId && (
                                                <p className="text-red-500 text-xs mt-1">{errors.transactionId.message}</p>
                                            )}
                                        </div>
                                        <div>
                                            <label htmlFor="paymentProof" className="block text-sm font-medium text-gray-700">
                                                Minh chứng thanh toán
                                            </label>
                                            <input
                                                {...register('paymentProof', {
                                                    required: 'Vui lòng cung cấp minh chứng thanh toán',
                                                })}
                                                type="text"
                                                id="paymentProof"
                                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-10 px-4"
                                                placeholder="Dán URL ảnh chụp màn hình thanh toán"
                                            />
                                            {errors.paymentProof && (
                                                <p className="text-red-500 text-xs mt-1">{errors.paymentProof.message}</p>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            Sau khi thanh toán qua VNPay, vui lòng điền mã giao dịch và đính kèm ảnh chụp màn hình xác nhận thanh toán.
                                        </p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-6">
                                <button
                                    type="submit"
                                    disabled={!isChecked}
                                    className={`w-full py-3 px-4 rounded-md text-white font-semibold ${!isChecked ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                                        }`}
                                    onClick={handleSubmit(onSubmit)}
                                >
                                    Đặt hàng
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CheckoutPage;