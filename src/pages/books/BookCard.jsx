import React, { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = (e) => {
        e.preventDefault(); // Prevent link navigation
        dispatch(
            addToCart({
                id: book._id,
                title: book.title,
                price: book.newPrice,
                coverImage: book.coverImage,
                category: book.category,
                quantity: parseInt(quantity),
            })
        );
        setQuantity(1);
    };

    return (
        <Link
            to={`/books/${book._id}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 flex flex-col overflow-hidden"
        >
            <div className="relative group">
                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-[300px] object-contain bg-gray-50 p-4"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition duration-300 flex items-center justify-center">
                    <form
                        onClick={(e) => e.stopPropagation()}
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white p-3 rounded-xl shadow-lg flex items-center gap-3"
                        onSubmit={handleAddToCart}
                    >
                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            onChange={(e) => setQuantity(e.target.value)}
                            className="w-16 text-center border border-gray-300 rounded-md py-1"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center gap-2 text-sm"
                        >
                            <FiShoppingCart />
                            <span>Add</span>
                        </button>
                    </form>
                </div>
            </div>
            <div className="p-4 flex flex-col gap-2">
                <h3 className="text-lg font-semibold line-clamp-2">{book.title}</h3>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-red-600">${book.newPrice}</span>
                        <span className="text-sm text-gray-400 line-through">${book.oldPrice}</span>
                    </div>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                        {Math.round(((book.oldPrice - book.newPrice) / book.oldPrice) * 100)}% OFF
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default BookCard;
