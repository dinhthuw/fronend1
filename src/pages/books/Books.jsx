import React, { useState } from 'react'
import { useGetAllBooksQuery } from '../../redux/features/books/booksApi'
import { useFetchAllCategoriesQuery } from '../../redux/features/categories/categoriesApi'
import BookCard from '../../components/BookCard'
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline'

const Books = () => {
    const { data: books = [], isLoading: isLoadingBooks } = useGetAllBooksQuery()
    const { data: categories = [], isLoading: isLoadingCategories } = useFetchAllCategoriesQuery()

    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('all')
    const [sortOption, setSortOption] = useState('newest')
    const [currentPage, setCurrentPage] = useState(1)
    const booksPerPage = 8

    // Tìm kiếm + lọc thể loại
    let filteredBooks = books.filter(book => {
        const matchesSearch = book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = filter === 'all' || book.category?._id === filter;
        return matchesSearch && matchesCategory;
    });

    // Sắp xếp
    if (sortOption === 'price-asc') {
        filteredBooks.sort((a, b) => a.newPrice - b.newPrice)
    } else if (sortOption === 'price-desc') {
        filteredBooks.sort((a, b) => b.newPrice - a.newPrice)
    } else if (sortOption === 'bestseller') {
        filteredBooks.sort((a, b) => b.sold - a.sold) 
    } else if (sortOption === 'newest') {
        filteredBooks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // giả sử có trường createdAt
    }

    // Phân trang
    const indexOfLastBook = currentPage * booksPerPage
    const indexOfFirstBook = indexOfLastBook - booksPerPage
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)
    const totalPages = Math.ceil(filteredBooks.length / booksPerPage)

    // Xử lý loading
    if (isLoadingBooks || isLoadingCategories) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
            </div>
        )
    }

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Hero Section */}
                <div className="relative rounded-3xl overflow-hidden mb-12 bg-gradient-to-r from-indigo-500 to-purple-600 shadow-xl">
                    <div className="absolute inset-0 bg-black opacity-20"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-90"></div>
                    <div className="relative px-8 py-16 sm:px-12 lg:px-16">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
                                Khám phá thế giới qua từng trang sách
                            </h1>
                            <p className="text-indigo-100 text-xl mb-8 max-w-2xl">
                                Bộ sưu tập sách đa dạng với nhiều thể loại, từ tiểu thuyết đến sách khoa học, mang đến trải nghiệm đọc sách tuyệt vời.
                            </p>
                            <div className="relative max-w-xl">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600 bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm text-white placeholder-indigo-200"
                                    placeholder="Tìm kiếm theo tên sách hoặc tác giả..."
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bộ lọc thể loại */}
                <div className="flex flex-wrap items-center mb-10 bg-white rounded-xl p-4 shadow-md">
                    <div className="flex items-center mr-4 text-gray-600">
                        <FunnelIcon className="h-5 w-5 mr-2" />
                        <span className="font-medium">Thể loại:</span>
                    </div>
                    <select
                        value={filter}
                        onChange={(e) => {
                            setFilter(e.target.value);
                            setCurrentPage(1); // Reset trang khi thay filter
                        }}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">Tất cả</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>{category.name}</option>
                        ))}
                    </select>
                </div>

                {/* Kết quả và sắp xếp */}
                <div className="mb-8 flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {filteredBooks.length > 0 ? (
                            <>Hiển thị <span className="text-indigo-600">{filteredBooks.length}</span> sách</>
                        ) : 'Không tìm thấy sách nào'}
                    </h2>
                    <div className="hidden sm:block">
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="newest">Mới nhất</option>
                            <option value="price-asc">Giá tăng dần</option>
                            <option value="price-desc">Giá giảm dần</option>
                            <option value="bestseller">Bán chạy nhất</option>
                        </select>
                    </div>
                </div>

                {/* Danh sách sách */}
                {currentBooks.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {currentBooks.map(book => (
                                <div key={book._id} className="transform transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                                    <BookCard book={book} />
                                </div>
                            ))}
                        </div>

                        {/* Phân trang */}
                        <div className="flex justify-center mt-10 space-x-2">
                            {Array.from({ length: totalPages }, (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentPage(index + 1)}
                                    className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                                        }`}
                                >
                                    {index + 1}
                                </button>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="bg-white rounded-xl shadow-md p-12 text-center">
                        <div className="inline-block p-6 bg-gray-100 rounded-full mb-6">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-medium text-gray-900 mb-2">Không tìm thấy sách nào</h3>
                        <p className="text-gray-500 mb-6">Hãy thử tìm kiếm với từ khóa khác hoặc xem tất cả sách</p>
                        <button
                            onClick={() => {
                                setSearchTerm('');
                                setFilter('all');
                                setCurrentPage(1);
                            }}
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Xem tất cả sách
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Books
