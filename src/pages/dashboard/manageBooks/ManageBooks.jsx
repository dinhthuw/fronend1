import React from "react";
import { useDeleteBookMutation, useGetAllBooksQuery } from "../../../redux/features/books/booksApi";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { IoAddCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";

const ManageBooks = () => {
    const navigate = useNavigate();
    const { data: books, isLoading, error, refetch } = useGetAllBooksQuery();
    const [deleteBook, { isLoading: isDeleting }] = useDeleteBookMutation();

    const handleDeleteBook = async (id) => {
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
                await deleteBook(id).unwrap();
                Swal.fire({
                    icon: "success",
                    title: "Thành công",
                    text: "Sách đã được xóa!",
                });
                refetch();
            }
        } catch (error) {
            console.error("Failed to delete book:", error);
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Không thể xóa sách. Vui lòng thử lại.",
            });
        }
    };

    const handleEditClick = (id) => {
        navigate(`/dashboard/edit-book/${id}`);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container mx-auto px-4 py-8">
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded">
                    <p>Không thể tải danh sách sách. Vui lòng thử lại sau.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-semibold text-gray-800">Quản lý sách</h2>
                <Link
                    to="/dashboard/add-new-book"
                    className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                    <IoAddCircleOutline className="size-5" />
                    Thêm sách mới
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Danh mục</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Giá</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {books && books.length > 0 ? (
                                books.map((book, index) => (
                                    <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                                        <td className="px-4 py-3 text-sm font-medium text-gray-900">{book.title}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{book.category?.name || "N/A"}</td>
                                        <td className="px-4 py-3 text-sm text-gray-600">{book.newPrice?.toFixed(2)}đ</td>
                                        <td className="px-4 py-3 text-sm">
                                            <div className="flex items-center gap-4">
                                                <button
                                                    onClick={() => handleEditClick(book._id)}
                                                    className="text-indigo-600 hover:text-indigo-800 transition-colors"
                                                    title="Chỉnh sửa"
                                                >
                                                    <HiOutlinePencilAlt className="size-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteBook(book._id)}
                                                    disabled={isDeleting}
                                                    className={`text-red-600 hover:text-red-800 transition-colors ${isDeleting ? "opacity-50 cursor-not-allowed" : ""
                                                        }`}
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
                                    <td colSpan={5} className="px-4 py-3 text-center text-sm text-gray-500">
                                        Không tìm thấy sách nào
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageBooks;