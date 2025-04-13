import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { useGetAllBooksQuery } from '../../redux/features/books/booksApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

const Recommened = () => {
    const dispatch = useDispatch();
    const { data: books = [] } = useGetAllBooksQuery();
    
    const handleAddToCart = (book) => {
        dispatch(addToCart({
            id: book._id,
            title: book.title,
            price: book.newPrice,
            coverImage: book.coverImage,
            quantity: 1
        }));
        
        // Toast notification handled in the slice
    }
    
    // Lọc sách có trending = true hoặc lấy 6 sách đầu tiên nếu không có sách trending
    const recommendedBooks = books.filter(book => book.trending).slice(0, 6);
    const displayBooks = recommendedBooks.length > 0 ? recommendedBooks : books.slice(0, 6);

    return (
        <div className='py-16'>
            <h2 className='text-3xl font-semibold mb-6'>Recommended for you</h2>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                }}
                loop={true}
                breakpoints={{
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                {displayBooks.length > 0 ? (
                    displayBooks.map((book, index) => (
                        <SwiperSlide key={index}>
                            <Link to={`/books/${book._id}`} key={book._id} className="group">
                            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
                                <div className="relative overflow-hidden group h-56">
                                    <img 
                                        src={book.coverImage} 
                                        alt={book.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.onerror = null;
                                            e.target.src = 'https://via.placeholder.com/300x400?text=Book+Cover+Not+Available';
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-semibold text-lg mb-2 truncate">{book.title}</h3>
                                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">{book.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-red-600 font-bold">${book.newPrice}</span>
                                        <span className="text-gray-500 line-through text-sm">${book.oldPrice}</span>
                                    </div>
                                    <button 
                                        onClick={() => handleAddToCart(book)} 
                                        className="w-full mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-300 active:bg-blue-800"
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                            </Link>
                        </SwiperSlide>
                    ))
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">No recommended books available</p>
                    </div>
                )}
            </Swiper>
        </div>
    );
};

export default Recommened;