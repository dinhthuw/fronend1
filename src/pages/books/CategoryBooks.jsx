import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetAllBooksQuery } from '../../redux/features/books/booksApi'
import { useFetchAllCategoriesQuery } from '../../redux/features/categories/categoriesApi'
import BookCard from '../../components/BookCard'

const CategoryBooks = () => {
    const { id } = useParams()
    const { data: books = [] } = useGetAllBooksQuery()
    const { data: categories = [] } = useFetchAllCategoriesQuery()

    const category = categories.find(cat => cat._id === id)
    const categoryBooks = books.filter(book => book.category?._id === id)

    if (!category) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Không tìm thấy thể loại</p>
            </div>
        )
    }

    return (
        <div className="py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">Sách thể loại: {category.name}</h1>
                
                {categoryBooks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {categoryBooks.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Không có sách nào trong thể loại này</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CategoryBooks 