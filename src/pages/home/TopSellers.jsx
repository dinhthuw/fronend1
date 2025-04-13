import React, { useState } from 'react';
import { useGetAllBooksQuery } from '../../redux/features/books/booksApi';
import { useFetchAllCategoriesQuery } from '../../redux/features/categories/categoriesApi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import { FiShoppingCart, FiFilter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const TopSellers = () => {
    const { data: books = [], isLoading } = useGetAllBooksQuery();
    const { data: categories = [] } = useFetchAllCategoriesQuery();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const dispatch = useDispatch();

    const filteredBooks = selectedCategory === 'all'
        ? books
        : books.filter(book => book.category?._id === selectedCategory);

    // Calculate pagination values
    const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top when changing pages
        window.scrollTo(0, 0);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    const handleAddToCart = (e, book) => {
        e.preventDefault(); // Prevent navigation when clicking the button
        dispatch(addToCart({
            id: book._id,
            title: book.title,
            price: book.newPrice,
            coverImage: book.coverImage,
            quantity: 1
        }));
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold">All Books</h2>
                <div className="flex items-center gap-2">
                    <FiFilter className="text-gray-600" />
                    <select
                        value={selectedCategory}
                        onChange={(e) => {
                            setSelectedCategory(e.target.value);
                            setCurrentPage(1); // Reset to first page when category changes
                        }}
                        className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Categories</option>
                        {categories?.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentItems?.map((book) => (
                    <Link 
                        to={`/books/${book._id}`} 
                        key={book._id}
                        className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                        <div className="relative group">
                            <img 
                                src={book.coverImage} 
                                alt={book.title}
                                className="w-full h-[300px] object-contain bg-gray-50 p-4"
                            />
                            <div className="absolute inset-0  bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                                <button 
                                    onClick={(e) => handleAddToCart(e, book)}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 hover:bg-blue-700"
                                >
                                    <FiShoppingCart />
                                    <span>Add to Cart</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold mb-2 line-clamp-2">{book.title}</h3>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-red-600">{book.newPrice}đ</span>
                                    <span className="text-sm text-gray-500 line-through">${book.oldPrice}đ</span>
                                </div>
                                <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                                    {Math.round(((book.oldPrice - book.newPrice) / book.oldPrice) * 100)}% OFF
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-8 space-x-2">
                    <button 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-full ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                    >
                        <FiChevronLeft size={20} />
                    </button>
                    
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                currentPage === index + 1
                                    ? 'bg-blue-600 text-white'
                                    : 'text-blue-600 hover:bg-blue-100'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    
                    <button 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-full ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-600 hover:bg-blue-100'}`}
                    >
                        <FiChevronRight size={20} />
                    </button>
                </div>
            )}

            {/* Book count information */}
            <div className="text-center mt-4 text-gray-600">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredBooks.length)} of {filteredBooks.length} books
            </div>
        </div>
    );
};

export default TopSellers;