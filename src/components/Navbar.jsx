import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchBooks } from "../hooks/useSearchBooks";

const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
    { name: "Categories", href: "/categories" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState(null);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const { books, loading, error, suggestions } = useSearchBooks(searchQuery);

    console.log(cartItems);

    // Get user info from localStorage when component loads
    useEffect(() => {
        const userString = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (userString && token) {
            try {
                const userData = JSON.parse(userString);
                setUser(userData);
            } catch (error) {
                console.error("Error reading user data:", error);
            }
        }
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        window.location.href = '/';  // Reload page to ensure logout
    };

    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
    };

    // Calculate the total quantity of items in the cart
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/">
                                <h1 className="text-primary text-2xl font-bold">BookShelf</h1>
                            </Link>
                        </div>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/"
                                className="border-transparent hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Home
                            </Link>
                            <Link
                                to="/books"
                                className="border-transparent hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Books
                            </Link>
                            <Link
                                to="/about"
                                className="border-transparent hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                About
                            </Link>
                            <Link
                                to="/contact"
                                className="border-transparent hover:border-primary text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:space-x-4">
                        <div className="flex items-center space-x-4">
                            <div className="search-container">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="bg-gray-100 rounded-full py-2 px-4 pl-10 w-56 text-sm text-gray-700 focus:outline-none focus:bg-white focus:ring-1 focus:ring-primary"
                                        placeholder="Search books..."
                                    />
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <IoSearchOutline className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                            <Link
                                to="/cart"
                                className="relative text-gray-700 hover:text-primary"
                            >
                                <HiOutlineShoppingCart className="h-6 w-6" />
                                {totalQuantity > 0 && (
                                    <span className="absolute top-3 bg-blue-600 -right-3 text-white rounded-full w-5 h-5 flex items-center justify-center text-md"
                                    >
                                        {totalQuantity}
                                    </span>
                                )}
                            </Link>
                            <Link
                                to="/wishlist"
                                className="text-gray-700 hover:text-primary transition-colors"
                            >
                                <HiOutlineHeart className="h-6 w-6" />
                            </Link>
                        </div>

                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <img
                                        src={avatarImg}
                                        alt="User avatar"
                                        className="h-8 w-8 rounded-full"
                                    />
                                    <span className="text-sm font-medium text-gray-700">
                                        {user.name}
                                    </span>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                        <button
                                            onClick={() => {
                                                handleLogout();
                                                setIsDropdownOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
                            >
                                <HiOutlineUser className="h-6 w-6" />
                                <span className="text-sm font-medium">Login</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
