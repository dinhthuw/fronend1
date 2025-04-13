import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateBookMutation, useGetSingleBookQuery } from "../../../redux/features/books/booksApi";
import { useFetchAllCategoriesQuery } from "../../../redux/features/categories/categoriesApi";
import Swal from "sweetalert2";
import Loading from "../../../components/Loading";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: bookData, isLoading: isBookLoading, error: bookError } = useGetSingleBookQuery(id);
    const { data: categories = [], isLoading: isCategoriesLoading } = useFetchAllCategoriesQuery();
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");

    useEffect(() => {
        if (bookData) {
            setValue("title", bookData.title);
            setValue("description", bookData.description);
            setValue("category", bookData?.category?._id || "");
            setValue("trending", bookData.trending);
            setValue("oldPrice", bookData.oldPrice);
            setValue("newPrice", bookData.newPrice);
            setImagePreview(bookData.coverImage);
        }
    }, [bookData, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setValue("coverImage", reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (data) => {
        try {
            const updateBookData = {
                title: data.title.trim(),
                description: data.description.trim(),
                category: data.category,
                trending: data.trending || false,
                oldPrice: Number(data.oldPrice) || 0,
                newPrice: Number(data.newPrice) || 0,
                coverImage: imagePreview || data.coverImage,
            };

            // Validation
            if (!updateBookData.title) {
                Swal.fire({ icon: "error", title: "Lỗi", text: "Tiêu đề sách là bắt buộc" });
                return;
            }
            if (!updateBookData.description) {
                Swal.fire({ icon: "error", title: "Lỗi", text: "Mô tả sách là bắt buộc" });
                return;
            }
            if (!updateBookData.category) {
                Swal.fire({ icon: "error", title: "Lỗi", text: "Vui lòng chọn danh mục" });
                return;
            }
            if (updateBookData.oldPrice <= 0 || updateBookData.newPrice <= 0) {
                Swal.fire({ icon: "error", title: "Lỗi", text: "Giá sách phải lớn hơn 0" });
                return;
            }
            if (!updateBookData.coverImage || !updateBookData.coverImage.startsWith("data:image/")) {
                Swal.fire({ icon: "error", title: "Lỗi", text: "Ảnh bìa sách không hợp lệ" });
                return;
            }

            await updateBook({ id, book: updateBookData }).unwrap();
            Swal.fire({
                icon: "success",
                title: "Thành công",
                text: "Cập nhật sách thành công!",
            });
            navigate("/dashboard/manage-books");
        } catch (error) {
            console.error("Error updating book:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text:
                    error.status === 404
                        ? "Không tìm thấy sách hoặc danh mục"
                        : error.status === 400
                            ? error.data?.message || "Dữ liệu không hợp lệ"
                            : "Không thể cập nhật sách. Vui lòng thử lại.",
            });
        }
    };

    if (isBookLoading || isCategoriesLoading) return <Loading />;
    if (bookError) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    Không thể tải dữ liệu sách. Vui lòng thử lại sau.
                </div>
            </div>
        );
    }

    const categoryOptions = [
        { value: "", label: "Chọn danh mục" },
        ...categories.map((category) => ({
            value: category._id,
            label: category.name,
        })),
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-3xl font-semibold text-gray-800 mb-6">Chỉnh sửa sách</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                        <input
                            type="text"
                            {...register("title", { required: "Tiêu đề là bắt buộc" })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            placeholder="Nhập tiêu đề sách"
                        />
                        {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                        <textarea
                            {...register("description", { required: "Mô tả là bắt buộc" })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows="4"
                            placeholder="Nhập mô tả sách"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Danh mục</label>
                        <select
                            {...register("category", { required: "Danh mục là bắt buộc" })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                    </div>

                    <div>
                        <label className="inline-flex items-center">
                            <input
                                type="checkbox"
                                {...register("trending")}
                                className="rounded text-indigo-600 focus:ring-2 focus:ring-indigo-500"
                            />
                            <span className="ml-2 text-sm font-medium text-gray-700">Xu hướng</span>
                        </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Giá cũ</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("oldPrice", {
                                    required: "Giá cũ là bắt buộc",
                                    min: { value: 0, message: "Giá cũ không được âm" },
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Nhập giá cũ"
                            />
                            {errors.oldPrice && <p className="mt-1 text-sm text-red-600">{errors.oldPrice.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Giá mới</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register("newPrice", {
                                    required: "Giá mới là bắt buộc",
                                    min: { value: 0, message: "Giá mới không được âm" },
                                })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Nhập giá mới"
                            />
                            {errors.newPrice && <p className="mt-1 text-sm text-red-600">{errors.newPrice.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Ảnh bìa</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none"
                        />
                        {imagePreview && (
                            <div className="mt-2">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-40 h-40 object-cover rounded-md border border-gray-200"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            onClick={() => navigate("/dashboard/manage-books")}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className={`px-4 py-2 text-white rounded-md transition-colors ${isUpdating ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                        >
                            {isUpdating ? "Đang cập nhật..." : "Cập nhật sách"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateBook;