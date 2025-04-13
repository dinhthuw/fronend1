import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
    return (
        <div className='flex flex-col md:flex-row-reverse py-20 justify-between items-center gap-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12'>
            <div className='md:w-1/2 w-full flex items-center md:justify-end'>
                <img 
                    src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1000&auto=format&fit=crop" 
                    alt="Banner" 
                    className="w-full max-w-xl rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300" 
                />
            </div>
            
            <div className='md:w-1/2 w-full'>
                <h1 className='md:text-6xl text-4xl font-bold mb-8 text-gray-800 leading-tight'>New Releases This Week</h1>
                <p className='mb-12 text-gray-600 text-xl leading-relaxed'>It's time to update your reading list with some of the latest and greatest releases in the literary world. From heart-pumping thrillers to captivating memoirs, this week's new releases offer something for everyone</p>

                <Link to="/categories" className='btn-primary inline-flex items-center text-lg px-12 py-4'>
                    Browse Books
                    <svg className="w-6 h-6 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </Link>
            </div>
        </div>
    )
}

export default Banner