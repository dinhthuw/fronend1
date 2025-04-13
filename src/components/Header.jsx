import React from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import CategoryMenu from './CategoryMenu'
const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    
    const { user } = useSelector((state) => state.auth)

    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="text-2xl font-bold text-primary">
                        BookStore
                    </Link>

                    {/* Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        <CategoryMenu />
                        <Link to="/" className="text-gray-700 hover:text-primary transition-colors">
                            Trang chủ
                        </Link>
                        <Link to="/about" className="text-gray-700 hover:text-primary transition-colors">
                            Giới thiệu
                        </Link>
                        <Link to="/books" className="text-gray-700 hover:text-primary transition-colors">
                            Sách
                        </Link>
                        <Link to="/contact" className="text-gray-700 hover:text-primary transition-colors">
                            Liên hệ
                        </Link>
                    </nav>

                    {/* Search, Cart, User */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-700 hover:text-primary transition-colors">
                            <FaSearch className="text-xl" />
                        </button>
                        <Link to="/cart" className="relative text-gray-700 hover:text-primary transition-colors">
                            <FaShoppingCart className="text-xl" />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>
                        <Link
                            to={user ? "/profile" : "/login"}
                            className="text-gray-700 hover:text-primary transition-colors"
                        >
                            <FaUser className="text-xl" />
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Header;
