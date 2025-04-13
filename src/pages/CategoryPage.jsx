import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookCard from '../components/BookCard';

const CategoryPage = () => {
    const { slug } = useParams();
    const [category, setCategory] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCategoryAndBooks = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL;
                // Fetch category details
                const categoryResponse = await axios.get(`${API_URL}/api/categories`);
                const foundCategory = categoryResponse.data.find(cat => cat.slug === slug);
                
                if (!foundCategory) {
                    setError('Category not found');
                    setLoading(false);
                    return;
                }

                setCategory(foundCategory);

                // Fetch books in this category
                const booksResponse = await axios.get(`${API_URL}/api/books`);
                const categoryBooks = booksResponse.data.filter(book => 
                    book.category === foundCategory._id
                );
                setBooks(categoryBooks);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCategoryAndBooks();
    }, [slug]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-red-500 text-center p-4">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
            <p className="text-gray-600 mb-8">{category.description}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>

            {books.length === 0 && (
                <div className="text-center text-gray-500 py-8">
                    No books found in this category.
                </div>
            )}
        </div>
    );
};

export default CategoryPage; 