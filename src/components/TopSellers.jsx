import React from 'react';
import { Link } from 'react-router-dom';
import { useGetAllBooksQuery } from '../redux/features/books/booksApi';

const TopSellers = () => {
    const { data: books, isLoading, error } = useGetAllBooksQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    // Get top 4 books
    const topBooks = books?.slice(0, 4) || [];

    return (
        <div className="py-8">
            <h2 className="text-2xl font-bold mb-6">Top Sellers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {topBooks.map((book) => (
                    <Link to={`/books/${book._id}`} key={book._id} className="group">
                        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:scale-105">
                            <img 
                                src={book.coverImage} 
                                alt={book.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="font-semibold text-lg mb-2">{book.title}</h3>
                                <p className="text-gray-600 text-sm mb-2">{book.description}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-red-600 font-bold">${book.newPrice}</span>
                                    <span className="text-gray-500 line-through text-sm">${book.oldPrice}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default TopSellers; 