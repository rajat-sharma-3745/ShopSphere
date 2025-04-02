import React from 'react'
import { Link } from 'react-router-dom'
import featured from '../../assets/featured.webp'

function FeaturedCollection() {
  return (
    <section className='px-4 py-16 lg:px-10'>
        <div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
            {/* Left content */}
            <div className='lg:w-1/2 lg:text-left p-8 text-center'>
                <h2 className='text-lg font-semibold text-gray-700 mb-2'>Comfort and Style</h2>
                <h2 className='text-4xl lg:text-5xl font-bold mb-6'>Apparel made for your everyday life</h2>
                <p className='mb-6 text-gray-600 text-lg'>Discover high-quality, comfortable clothing that effortlessly blends fashion and function. Designed to make you look and feel great every day.</p>
                <Link to="/collections/all" className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800'>Shop Now</Link>
            </div>
            {/* Right content */}
            <div className='lg:w-1/2'>
                <img src={featured} className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl' alt="Featured Collection" />
            </div>
        </div>
    </section>
  )
}

export default FeaturedCollection