import React from 'react'
import heroImg from '../../assets/rabbit-hero.webp'
import mobileHero from '../../assets/mobileHero.jpg'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className='relative'>
        <img src={heroImg} loading='lazy' className='hidden sm:block w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover' alt="Hero Image" />
        <img src={mobileHero} loading='lazy' className='block sm:hidden w-full h-[390px] object-cover' alt="Hero Image" />
        <div className='absolute inset-0 md:bg-black/8 flex items-center justify-center'>
            <div className='text-center text-white p-6'>
                <h1 className='text-4xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>
                    Vacation <br />Ready
                </h1>
                <p className='text-md tracking-tighter md:text-lg mb-6 '>
                    Explore our vacation-ready outfits with fast worldwide shipping.
                </p>
                <Link to='collections/all' className='bg-white text-gray-950 rounded-sm sm:px-6 px-3 py-2 sm:text-lg text-md'>Shop Now</Link>
            </div>
        </div>
    </section>
  )
}

export default Hero