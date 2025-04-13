import React, { useState, useEffect } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { HiOutlinePlus } from 'react-icons/hi';
import { useFetchAllCategoriesQuery } from '../../../redux/features/categories/categoriesApi'
import getBaseUrl from '../../../utils/baseURL';
import Toast from '../../../components/Toast';

const AddBook = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            title: '',
            description: '',
            category: '',
            trending: false,
            oldPrice: '',
            newPrice: ''
        },
        mode: 'onChange'
    });
    const [imageFile, setimageFile] = useState(null);
    const [imageFileName, setimageFileName] = useState('');
    const [base64Image, setBase64Image] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toastConfig, setToastConfig] = useState({ type: '', message: '' });
    const navigate = useNavigate();
    const { data: categoriesData = [], isLoading: isCategoriesLoading } = useFetchAllCategoriesQuery();

    // Show toast message when config changes
    useEffect(() => {
        if (toastConfig.message) {
            // The Toast component will handle showing the toast
            // This effect is just to clear the message after it's been displayed
            const timer = setTimeout(() => {
                setToastConfig({ type: '', message: '' });
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [toastConfig]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                icon: 'warning',
                title: 'Phiên đăng nhập hết hạn',
                text: 'Vui lòng đăng nhập lại để tiếp tục',
                confirmButtonText: 'OK'
            }).then(() => {
                navigate('/admin/login');
            });
            return;
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }, [navigate]);

    const handleAuthError = () => {
        Swal.fire({
            icon: 'error',
            title: 'Lỗi xác thực',
            text: 'Bạn không có quyền truy cập chức năng này. Vui lòng kiểm tra lại quyền của bạn.',
            confirmButtonText: 'Đồng ý'
        });
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        console.log('=== BẮT ĐẦU XỬ LÝ FILE ẢNH ===');
    
        if (!file) {
            console.log('Không có file được chọn');
            return;
        }
    
        console.log('File đã chọn:', {
            name: file.name,
            type: file.type,
            size: `${(file.size / 1024).toFixed(2)} KB`
        });
    
        if (file.size > 5 * 1024 * 1024) {
            console.log('File quá lớn:', file.size);
            setToastConfig({
                type: 'error',
                message: 'Kích thước file quá lớn. Vui lòng chọn file nhỏ hơn 5MB'
            });
            return;
        }
    
        try {
            // === Nén ảnh trước khi chuyển sang base64 ===
            const compressedBlob = await compressImage(file, 50); // Giảm xuống 50KB
            const compressedFile = new File([compressedBlob], file.name, { type: "image/jpeg" });
    
            console.log('📉 File sau khi nén:', {
                name: compressedFile.name,
                type: compressedFile.type,
                size: `${(compressedFile.size / 1024).toFixed(2)} KB`
            });
    
            setimageFile(compressedFile);
            setimageFileName(compressedFile.name);
    
            const reader = new FileReader();
    
            reader.onloadstart = () => {
                console.log('Bắt đầu đọc file...');
            };
    
            reader.onload = () => {
                console.log('Đọc file thành công');
                const base64String = reader.result;
                console.log('Độ dài base64:', base64String.length);
                console.log('Prefix base64:', base64String.substring(0, 50));
    
                setBase64Image(base64String);
                console.log('Đã lưu base64 vào state');
            };
    
            reader.onerror = (error) => {
                console.error('Lỗi khi đọc file:', error);
                setToastConfig({
                    type: 'error',
                    message: 'Có lỗi khi xử lý file ảnh'
                });
            };
    
            reader.onloadend = () => {
                console.log('=== KẾT THÚC XỬ LÝ FILE ẢNH ===');
            };
    
            console.log('Bắt đầu chuyển đổi file sang base64...');
            reader.readAsDataURL(compressedFile);
        } catch (error) {
            console.error('Lỗi khi nén ảnh:', error);
            setToastConfig({
                type: 'error',
                message: 'Có lỗi khi nén ảnh, vui lòng thử lại'
            });
        }
    };
    
    // === Hàm nén ảnh xuống 50KB ===
    const compressImage = (file, maxSizeKB = 50) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
    
                    // Tính toán tỉ lệ giảm kích thước
                    const scaleFactor = Math.sqrt((maxSizeKB * 1024) / file.size);
                    canvas.width = img.width * scaleFactor;
                    canvas.height = img.height * scaleFactor;
    
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                    canvas.toBlob((blob) => {
                        resolve(blob);
                    }, "image/jpeg", 0.7); // Chất lượng 70%
                };
            };
            reader.onerror = (error) => reject(error);
        });
    };
    
    const handleFormSubmit = handleSubmit(async (data) => {
        try {
            const token = localStorage.getItem('token');
            const oldPrice = data.oldPrice;
            const newPrice = data.newPrice;
            // Create data with the required server format
            const bookData = {
                title: data.title.trim(),
                description: data.description.trim(),
                category: data.category,
                oldPrice: oldPrice,
                newPrice: newPrice,
                coverImage: base64Image,
                trending: Boolean(data.trending)
            };
            console.log('bookData', bookData);
            setIsSubmitting(true);

            const response = await axios.post(`${getBaseUrl()}/api/books`, bookData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                timeout: 30000 // Add timeout to avoid hanging requests
            });

            if (response.data && response.data.success) {
                setToastConfig({
                    type: 'success',
                    message: 'Thêm sách thành công!'
                });
                reset(); // Reset form
                setimageFileName('');
                setimageFile(null);
                setBase64Image('');
                navigate('/dashboard/manage-books');
            } else {
                console.error('Server response:', response.data);
                setToastConfig({
                    type: 'error',
                    message: response.data?.message || 'Không thể thêm sách'
                });
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            
            // Check if server returned a response
            if (error.response) {
                console.error('Server error response:', error.response.data);
                console.error('Status code:', error.response.status);
                
                // Handle different status codes
                if (error.response.status === 401) {
                    setToastConfig({
                        type: 'error',
                        message: 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại'
                    });
                    localStorage.removeItem('token');
                    navigate('/login');
                    return;
                } else if (error.response.status === 413) {
                    setToastConfig({
                        type: 'error',
                        message: 'Kích thước ảnh quá lớn. Vui lòng chọn ảnh nhỏ hơn'
                    });
                    return;
                }
                
                setToastConfig({
                    type: 'error',
                    message: error.response.data?.message || 'Lỗi từ máy chủ khi thêm sách'
                });
            } 
            // Handle network errors (no response from server)
            else if (error.request) {
                console.error('No response from server:', error.request);
                setToastConfig({
                    type: 'error',
                    message: 'Không nhận được phản hồi từ máy chủ. Vui lòng kiểm tra kết nối internet'
                });
            } 
            // Handle other errors
            else {
                setToastConfig({
                    type: 'error',
                    message: 'Có lỗi xảy ra khi thêm sách: ' + error.message
                });
            }
        } finally {
            setIsSubmitting(false);
        }
    });

    if (isCategoriesLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            {/* Toast component that shows notifications based on toastConfig */}
            <Toast type={toastConfig.type} message={toastConfig.message} />
            
            <h1 className="text-2xl font-bold mb-6">Thêm sách mới</h1>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <form onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <InputField
                            label="Tiêu đề sách"
                            name="title"
                            placeholder="Nhập tiêu đề sách"
                            register={register}
                            error={errors.title?.message}
                            required
                        />

                        <InputField
                            label="Mô tả sách"
                            name="description"
                            placeholder="Nhập mô tả sách"
                            type="textarea"
                            register={register}
                            error={errors.description?.message}
                            required
                        />

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Danh mục</label>
                            <select
                                {...register('category', { 
                                    required: 'Vui lòng chọn danh mục',
                                    validate: value => value !== '' || 'Vui lòng chọn danh mục'
                                })}
                                className={`mt-1 block w-full rounded-md shadow-sm ${
                                    errors.category ? 'border-red-500' : 'border-gray-300'
                                } focus:border-blue-500 focus:ring-blue-500`}
                            >
                                <option value="" key="default">Chọn danh mục</option>
                                {categoriesData.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
                            )}
                        </div>

                        <div className="md:col-span-2">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    {...register('trending')}
                                    defaultChecked={false}
                                    className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm font-semibold text-gray-700">Sách nổi bật</span>
                            </label>
                        </div>

                        <InputField
                            label="Giá cũ"
                            name="oldPrice"
                            type="number"
                            placeholder="Nhập giá cũ"
                            register={register}
                            error={errors.oldPrice?.message}
                            required
                            min="0"
                            step="1"
                        />

                        <InputField
                            label="Giá mới"
                            name="newPrice"
                            type="number"
                            placeholder="Nhập giá mới"
                            register={register}
                            error={errors.newPrice?.message}
                            required
                            min="0"
                            step="1"
                        />

                        <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Ảnh bìa sách</label>
                            <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleFileChange} 
                                className="mb-2 w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500" 
                            />
                            {imageFileName && (
                                <p className="text-sm text-gray-500">Đã chọn: {imageFileName}</p>
                            )}
                        </div>
                    </div>

                    <div className="mt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center ${
                                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2"></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <HiOutlinePlus className="h-5 w-5 mr-2" />
                                    Thêm sách mới
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddBook