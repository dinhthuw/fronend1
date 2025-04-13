import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const ManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingCategory, setEditingCategory] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "" });
    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const API_URL = import.meta.env.VITE_API_URL || "https://back1-3byw.onrender.com";

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/categories`);
            setCategories(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error("Error fetching categories:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Không thể tải danh sách danh mục",
            });
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            if (editingCategory) {
                await axios.patch(`${API_URL}/api/categories/${editingCategory._id}`, formData);
                Swal.fire({
                    icon: "success",
                    title: "Thành công",
                    text: "Danh mục đã được cập nhật",
                });
            } else {
                await axios.post(`${API_URL}/api/categories`, formData);
                Swal.fire({
                    icon: "success",
                    title: "Thành công",
                    text: "Danh mục đã được thêm",
                });
            }
            setFormData({ name: "", description: "" });
            setEditingCategory(null);
            setShowModal(false);
            fetchCategories();
        } catch (error) {
            console.error("Error saving category:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: error.response?.data?.message || "Có lỗi xảy ra",
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleEdit = (category) => {
        setEditingCategory(category);
        setFormData({ name: category.name, description: category.description });
        setShowModal(true);
    };

    const handleDelete = async (categoryId) => {
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
                await axios.delete(`${API_URL}/api/categories/${categoryId}`);
                Swal.fire({
                    icon: "success",
                    title: "Đã xóa!",
                    text: "Danh mục đã được xóa.",
                });
                fetchCategories();
            }
        } catch (error) {
            console.error("Error deleting category:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Không thể xóa danh mục",
            });
        }
    };

    const openModal = () => {
        setEditingCategory(null);
        setFormData({ name: "", description: "" });
        setShowModal(true);
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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Quản lý danh mục</h2>
                <button
                    onClick={openModal}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    <IoAddCircleOutline className="size-5" />
                    Thêm danh mục mới
                </button>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên danh mục</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {categories.length > 0 ? (
                                categories.map((category) => (
                                    <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{category.name}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{category.description}</td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleEdit(category)}
                                                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                                                    title="Chỉnh sửa"
                                                >
                                                    <HiOutlinePencilAlt className="size-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(category._id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors"
                                                    title="Xóa"
                                                >
                                                    <HiOutlineTrash className="size-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="px-4 py-3 text-center text-sm text-gray-500">
                                        Không tìm thấy danh mục nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal for Add/Edit Category */}
            {showModal && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setShowModal(false)}></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 w-full max-w-md z-50">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-gray-800">
                                {editingCategory ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
                            </h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Tên danh mục</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    rows="4"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className={`px-4 py-2 text-white rounded-md transition-colors ${submitting ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
                                        }`}
                                >
                                    {submitting ? "Đang xử lý..." : editingCategory ? "Cập nhật" : "Thêm"}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
};

export default ManageCategories;