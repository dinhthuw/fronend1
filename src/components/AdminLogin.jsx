import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from "../utils/baseURL";
import { useNavigate } from "react-router-dom";
import { FiBook, FiLock, FiUser } from 'react-icons/fi';

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    console.log('Form submitted with data:', data);
    try {
      console.log('Making API request to:', `${getBaseUrl()}/api/auth/admin/login`);
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin/login`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const auth = response.data;

      if (auth.token) {
        localStorage.setItem("token", auth.token);
        // Set default authorization header for all future requests
        axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
        
        setTimeout(() => {
          localStorage.removeItem("token");
          delete axios.defaults.headers.common['Authorization'];
          alert("Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.");
          navigate("/");
        }, 3600 * 1000); // Token expiry time: 1 hour
      }

      alert("Đăng nhập quản trị viên thành công!");
      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        console.log("Error response:", error.response.data);
        setMessage(
          error.response.data.message ||
            "Vui lòng nhập tên đăng nhập và mật khẩu hợp lệ."
        );
      } else if (error.request) {
        console.error("Error request:", error.request);
        setMessage("Không nhận được phản hồi từ máy chủ. Vui lòng thử lại.");
      } else {
        console.error("Error:", error.message);
        setMessage("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full flex bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Left side - Image */}
        <div className="hidden lg:block lg:w-1/2 bg-cover bg-center relative">
          <div className="absolute inset-0  bg-opacity-40"></div>
          <img 
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Books background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-white p-8">
              <FiBook className="w-16 h-16 mx-auto mb-4" />
              <h1 className="text-4xl font-bold mb-2">Quản Trị Viên</h1>
              <p className="text-lg">Quản lý cửa hàng sách của bạn dễ dàng</p>
            </div>
          </div>
        </div>

        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Chào mừng trở lại</h2>
            <p className="mt-2 text-gray-600">Vui lòng đăng nhập vào tài khoản quản trị</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Tên đăng nhập
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("username", { required: true })}
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Nhập tên đăng nhập"
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-600">Vui lòng nhập tên đăng nhập</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mật khẩu
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("password", { required: true })}
                    type="password"
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">Vui lòng nhập mật khẩu</p>
                )}
              </div>
            </div>

            {message && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{message}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isSubmitting ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200`}
              >
                {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
