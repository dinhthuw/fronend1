import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import axios from 'axios';
import getBaseUrl from '../utils/baseURL';

const Login = () => {
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm();

      const onSubmit = async (data) => {
        try {
            // Kiểm tra xem có nhập đầy đủ dữ liệu không
            if (!data.email || !data.password) {
                setMessage("Vui lòng nhập đầy đủ email và mật khẩu");
                return;
            }

            // Dữ liệu đăng nhập chỉ gồm email và mật khẩu
            const loginData = {
                email: data.email,
                password: data.password
            };
            
            console.log("Đang gửi dữ liệu đăng nhập:", loginData);

            // Gọi API đăng nhập
            const response = await axios.post(
                `${getBaseUrl()}/api/auth/login`,
                loginData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Phản hồi từ server:", response.data);
            const auth = response.data;

            if (auth.token) {
                localStorage.setItem("token", auth.token);
                
                // Lưu thông tin người dùng
                if (auth.user) {
                    localStorage.setItem("user", JSON.stringify(auth.user));
                }
                
                // Thiết lập header xác thực
                axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`;
                
                // Thiết lập thời gian hết hạn token
                setTimeout(() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("user");
                    delete axios.defaults.headers.common['Authorization'];
                    alert("Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.");
                    navigate("/login");
                }, 24 * 3600 * 1000); // Token hết hạn sau 24 giờ
            }

            alert("Đăng nhập thành công!");
            navigate("/");
        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            
            if (error.response) {
                console.log("Phản hồi lỗi:", error.response.data);
                setMessage(
                    error.response.data.message ||
                    "Email hoặc mật khẩu không chính xác"
                );
            } else if (error.request) {
                console.error("Lỗi request:", error.request);
                setMessage("Không nhận được phản hồi từ server. Vui lòng thử lại.");
            } else {
                console.error("Lỗi:", error.message);
                setMessage("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
            }
        }
      }

  return (
    <div className='h-[calc(100vh-120px)] flex justify-center items-center '>
        <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
            <h2 className='text-xl font-semibold mb-4'>Đăng nhập</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="email">Email</label>
                    <input 
                        {...register("email", { required: true })} 
                        type="email" 
                        name="email" 
                        id="email" 
                        placeholder='Địa chỉ email'
                        className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                    />
                </div>
                
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Mật khẩu</label>
                    <input 
                        {...register("password", { required: true })} 
                        type="password" 
                        name="password" 
                        id="password" 
                        placeholder='Mật khẩu'
                        className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                    />
                </div>
                
                {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}
                
                <div>
                    <button 
                        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                    </button>
                </div>
            </form>
            <p className='align-baseline font-medium mt-4 text-sm'>Chưa có tài khoản? <Link to="/register" className='text-blue-500 hover:text-blue-700'>Đăng ký</Link></p>

            <p className='mt-5 text-center text-gray-500 text-xs'>©2025 Book Store. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Login