import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUpdateBookMutation, useGetSingleBookQuery } from '../../../redux/features/books/booksApi';
import { useFetchAllCategoriesQuery } from '../../../redux/features/categories/categoriesApi';

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: book, isLoading: isLoadingBook } = useGetSingleBookQuery(id);
    const { data: categories = [] } = useFetchAllCategoriesQuery();
    const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        oldPrice: '',
        newPrice: '',
        trending: false,
        coverImage: ''
    });

    const [imageFile, setImageFile] = useState(null);
    const [imageFileName, setImageFileName] = useState('');
    const [base64Image, setBase64Image] = useState('');

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || '',
                description: book.description || '',
                category: book.category?._id || '',
                oldPrice: book.oldPrice || '',
                newPrice: book.newPrice || '',
                trending: book.trending || false,
                coverImage: book.coverImage || ''
            });
            setBase64Image(book.coverImage || '');
        }
    }, [book]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImageFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const bookData = {
                ...formData,
                coverImage: base64Image || formData.coverImage
            };
            await updateBook({ id, ...bookData }).unwrap();
            navigate('/dashboard/manage-books');
        } catch (error) {
            console.error('Error updating book:', error);
        }
    };

    if (isLoadingBook) return <div>Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Update Book</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Category</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block mb-2">Old Price</label>
                    <input
                        type="number"
                        name="oldPrice"
                        value={formData.oldPrice}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">New Price</label>
                    <input
                        type="number"
                        name="newPrice"
                        value={formData.newPrice}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block mb-2">Cover Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                    />
                    {base64Image && (
                        <img
                            src={base64Image}
                            alt="Preview"
                            className="mt-2 max-w-xs"
                        />
                    )}
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="trending"
                        checked={formData.trending}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    <label>Trending</label>
                </div>

                <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
                >
                    {isUpdating ? 'Updating...' : 'Update Book'}
                </button>
            </form>
        </div>
    );
};

export default UpdateBook; 