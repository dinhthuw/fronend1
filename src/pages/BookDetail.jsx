import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSingleBookQuery } from '../redux/features/books/booksApi';
import { StarIcon } from '@heroicons/react/24/solid';

const BookDetail = () => {
    const { id } = useParams();
    const { data: book, isLoading, error } = useGetSingleBookQuery(id);
    const [quantity, setQuantity] = useState(1);

    if (isLoading) return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );
    
    if (error) return (
        <div className="container mx-auto px-4 py-8 text-center">
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="text-red-700">Error: {error.message}</p>
            </div>
        </div>
    );
    
    if (!book) return (
        <div className="container mx-auto px-4 py-8 text-center">
            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
                <p className="text-amber-700">Book not found</p>
            </div>
        </div>
    );

    // Mock data for the rating 
    const rating = 4.8;
    const reviews = 124;
    const author = book.author || "Unknown Author";

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    const increaseQuantity = () => {
        setQuantity(quantity + 1);
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen pt-16 pb-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="flex mb-8 text-sm font-medium text-gray-500">
                    <a href="/" className="hover:text-gray-900">Home</a>
                    <span className="mx-2">/</span>
                    <a href="/books" className="hover:text-gray-900">Books</a>
                    <span className="mx-2">/</span>
                    <span className="text-gray-900">{book.title}</span>
                </nav>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Book Image */}
                        <div className="relative h-full">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
                            <div className="flex items-center justify-center p-8 h-full relative">
                                <img 
                                    src={book.coverImage} 
                                    alt={book.title}
                                    className="max-h-[500px] object-contain rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105"
                                />
                            </div>
                        </div>
                        
                        {/* Book Details */}
                        <div className="p-8 lg:p-12 flex flex-col">
                            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-2">{book.title}</h1>
                            <p className="text-lg text-indigo-600 mb-6">by <span className="font-medium">{author}</span></p>
                            
                            {/* Rating */}
                            <div className="flex items-center mb-6">
                                <div className="flex">
                                    {[0, 1, 2, 3, 4].map((star) => (
                                        <StarIcon
                                            key={star}
                                            className={`h-5 w-5 ${
                                                star < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-200'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="ml-2 text-sm text-gray-600">
                                    {rating} ({reviews} reviews)
                                </p>
                            </div>
                            
                            {/* Description */}
                            <div className="prose prose-indigo max-w-none mb-8">
                                <p className="text-gray-700 leading-relaxed">{book.description}</p>
                            </div>
                            
                            {/* Price */}
                            <div className="flex items-baseline mb-8">
                                <span className="text-3xl font-bold text-indigo-700">${book.newPrice}</span>
                                {book.oldPrice && (
                                    <span className="text-lg text-gray-500 line-through ml-3">${book.oldPrice}</span>
                                )}
                                {book.oldPrice && (
                                    <span className="ml-3 px-2 py-0.5 bg-red-100 text-red-800 text-sm font-medium rounded-full">
                                        {Math.round((1 - book.newPrice / book.oldPrice) * 100)}% OFF
                                    </span>
                                )}
                            </div>
                            
                            {/* Quantity */}
                            <div className="flex items-center space-x-4 mb-8">
                                <span className="text-gray-700 font-medium">Quantity:</span>
                                <div className="flex items-center border border-gray-300 rounded-lg">
                                    <button 
                                        onClick={decreaseQuantity} 
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                        -
                                    </button>
                                    <span className="px-4 py-1 text-center text-gray-700">{quantity}</span>
                                    <button 
                                        onClick={increaseQuantity} 
                                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            
                            {/* Actions */}
                            <div className="mt-auto space-y-4">
                                <button className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:bg-indigo-700 transform transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Add to Cart
                                </button>
                                <button className="w-full bg-white text-indigo-600 border border-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                    Add to Wishlist
                                </button>
                            </div>
                            
                            {/* Additional Info */}
                            <div className="mt-8 pt-8 border-t border-gray-200">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">ISBN</p>
                                        <p className="font-medium">{book.isbn || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Publication Date</p>
                                        <p className="font-medium">{book.publicationDate || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Pages</p>
                                        <p className="font-medium">{book.pages || 'N/A'}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Publisher</p>
                                        <p className="font-medium">{book.publisher || 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail; 