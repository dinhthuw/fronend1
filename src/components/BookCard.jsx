import React from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineShoppingCart } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/features/cart/cartSlice';

const BookCard = ({ book }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(book));
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <Link to={`/books/${book._id}`}>
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-48 object-cover"
                />
            </Link>
            <div className="p-4">
                <Link to={`/books/${book._id}`}>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-primary">
                        {book.title}
                    </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {book.description}
                </p>
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-primary">
                            {book.newPrice.toLocaleString('vi-VN')}đ
                        </span>
                        {book.oldPrice && (
                            <span className="text-sm text-gray-500 line-through">
                                {book.oldPrice.toLocaleString('vi-VN')}đ
                            </span>
                        )}
                    </div>
                    <button
                        onClick={handleAddToCart}
                        className="bg-primary text-white p-2 rounded-full hover:bg-primary/90 transition-colors duration-300"
                    >
                        <HiOutlineShoppingCart className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookCard; 