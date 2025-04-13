import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { useFetchAllCategoriesQuery } from '../redux/features/categories/categoriesApi'

const CategoryMenu = () => {
    const [isHovered, setIsHovered] = useState(false)
    const { data: categories = [] } = useFetchAllCategoriesQuery()

    return (
        <div 
            className="relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className="flex items-center gap-2 text-gray-700 hover:text-primary transition-colors">
                <FaBars className="text-xl" />
                <span>Danh mục</span>
            </button>

            {/* Dropdown Menu */}
            <div 
                className={`absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg py-2 z-50 transition-all duration-300 ${
                    isHovered ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                {categories.map((category) => (
                    <Link
                        key={category._id}
                        to={`/categories/${category._id}`}
                        className="block px-4 py-2 text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                    >
                        {category.name}
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default CategoryMenu 