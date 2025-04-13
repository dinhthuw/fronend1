import React from 'react'
import { useSelector } from 'react-redux'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'

const Profile = () => {
    const { user } = useSelector((state) => state.auth)

    if (!user) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Vui lòng đăng nhập để xem thông tin</p>
            </div>
        )
    }

    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-8">Thông tin cá nhân</h1>

                    <div className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                                <FaUser className="text-3xl text-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold">{user.name}</h2>
                                <p className="text-gray-600">ID: {user._id}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <FaEnvelope className="text-primary text-xl" />
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="font-medium">{user.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaPhone className="text-primary text-xl" />
                                <div>
                                    <p className="text-sm text-gray-500">Số điện thoại</p>
                                    <p className="font-medium">{user.phone || 'Chưa cập nhật'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-primary text-xl" />
                                <div>
                                    <p className="text-sm text-gray-500">Địa chỉ</p>
                                    <p className="font-medium">{user.address || 'Chưa cập nhật'}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t">
                            <h3 className="text-xl font-semibold mb-4">Lịch sử đơn hàng</h3>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-gray-600">Chức năng đang được phát triển</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile 