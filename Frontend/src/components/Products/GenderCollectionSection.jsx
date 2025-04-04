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
               <div className='absolute bottom-8 left-8 bg-white/90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Women's Collection
                    </h2>
                    <Link to="/collections/all?gender=Women" className='text-gray-900 underline'>Shop Now</Link>
               </div>

            </div>
            {/* Mens Collection */}
            <div className='relative flex-1'>
               <img src={mensCollectionImage} alt="Men Collections" className='rounded-xl w-full md:h-[700px] object-cover' />
               <div className='absolute bottom-8 left-8 bg-white/90 p-4'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
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