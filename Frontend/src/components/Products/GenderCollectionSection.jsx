import React from 'react'
import mensCollectionImage from '../../assets/mens-collection.webp'
import womenCollectionImage from '../../assets/womens-collection.webp'
import { Link } from 'react-router-dom'

function GenderCollectionSection() {
  return (
    <section className='sm:py-10 py-8 px-4 lg:px-10'>
        <div className='container mx-auto flex flex-col md:flex-row gap-8'>
            {/* Womens collection */}
            <div className='relative flex-1'>
               <img src={womenCollectionImage} alt="Women Collections" className='rounded-xl w-full md:h-[700px] object-cover' />
               <div className='absolute bottom-8 left-8 bg-white/80 sm:p-4 p-2 rounded-md'>
                    <h2 className='sm:text-2xl text-lg font-bold text-gray-900 sm:mb-3 mb-1'>
                        Women's Collection
                    </h2>
                    <Link to="/collections/all?gender=Women" className='text-gray-900 underline'>Shop Now</Link>
               </div>

            </div>
            {/* Mens Collection */}
            <div className='relative flex-1'>
               <img src={mensCollectionImage} alt="Men Collections" className='rounded-xl w-full md:h-[700px] object-cover' />
               <div className='absolute bottom-8 left-8 bg-white/80 sm:p-4 p-2 rounded-md'>
                    <h2 className='sm:text-2xl text-lg font-bold text-gray-900 sm:mb-3 mb-1'>
                        Men's Collection
                    </h2>
                    <Link to="/collections/all?gender=Men" className='text-gray-900 underline'>Shop Now</Link>
               </div>

            </div>

        </div>

    </section>
  )
}

export default GenderCollectionSection