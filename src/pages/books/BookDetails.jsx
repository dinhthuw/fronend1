import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSingleBookQuery } from '../../redux/features/books/booksApi'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { FiShoppingCart, FiCalendar, FiTag, FiUser, FiBook, FiDollarSign, FiTrendingUp, FiArrowLeft, FiClock } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const BookDetails = () => {
    const { id } = useParams()
    const { data: book, isLoading } = useGetSingleBookQuery(id)
    const dispatch = useDispatch()

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!book) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy sách</p>
            </div>
        )
    }

    const handleAddToCart = () => {
        dispatch(addToCart({
            id: book._id,
            title: book.title,
            price: book.newPrice,
            coverImage: book.coverImage,
            quantity: 1
        }))
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <Link 
                to="/" 
                className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6"
            >
                <FiArrowLeft className="mr-2" />
                <span>Back to Home</span>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column - Image */}
                <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl shadow-lg overflow-hidden relative">
                    {/* Animation keyframes */}
                    <style jsx>{`
                        @keyframes floatLeftRight {
                            0% { transform: translateX(-10px); }
                            50% { transform: translateX(10px); }
                            100% { transform: translateX(-10px); }
                        }
                        .float-animation {
                            animation: floatLeftRight 6s ease-in-out infinite;
                        }
                        .hover-scale:hover {
                            transform: scale(1.05);
                            animation-play-state: paused;
                        }
                    `}</style>
                    
                    <div className="relative float-animation">
                        <div className="absolute -inset-4 bg-white/80 blur-xl rounded-full"></div>
                        <img 
                            src={book.coverImage} 
                            alt={book.title}
                            className="w-[580px] h-[420px] object-contain rounded-lg  relative hover-scale transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* Right Column - Details */}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
                    <p className="text-gray-600 mb-4">{book.description}</p>
                    
                    {/* Book Info */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center text-gray-600">
                            <FiTag className="mr-2 text-blue-600" />
                            <span>Category: {book.category?.name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FiCalendar className="mr-2 text-blue-600" />
                            <span>Published: {new Date(book.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FiClock className="mr-2 text-blue-600" />
                            <span>Updated: {new Date(book.updatedAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FiUser className="mr-2 text-blue-600" />
                            <span>Author: {book.author || 'Admin'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FiBook className="mr-2 text-blue-600" />
                            <span>Publisher: {book.publisher || 'N/A'}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <FiDollarSign className="mr-2 text-blue-600" />
                            <span>ISBN: {book.isbn || 'N/A'}</span>
                        </div>
                    </div>

                    {/* Price */}
                    <div className="flex items-center mb-6">
                        <span className="text-2xl font-bold text-red-600 mr-4">${book.newPrice}</span>
                        <span className="text-lg text-gray-500 line-through">${book.oldPrice}</span>
                        <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded ml-4">
                            {Math.round(((book.oldPrice - book.newPrice) / book.oldPrice) * 100)}% OFF
                        </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button 
                        onClick={handleAddToCart}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
                    >
                        <FiShoppingCart />
                        <span>Add to Cart</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BookDetails 