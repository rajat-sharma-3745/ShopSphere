import React from 'react'
import heroImg from '../../assets/rabbit-hero.webp'
import mobileHero from '../../assets/mobileHero.jpg'
import hero from '../../assets/hero.jpg'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <section className='relative'>
        <img src={hero} className='hidden sm:block w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover' alt="Hero Image" />
        <img src={mobileHero} loading='lazy' className='block sm:hidden w-full h-[450px] object-cover' alt="Hero Image" />
        <div className='absolute inset-0 md:bg-black/8 bg-black/20 flex items-center justify-center'>
            <div className='text-center text-white p-6'>
                <h1 className='text-5xl md:text-9xl font-bold tracking-tighter uppercase mb-4'>
                    Vacation <br />Ready
                </h1>
                <p className='text-md tracking-tighter md:text-xl mb-6'>
                    Explore our vacation-ready outfits with fast worldwide shipping.
                </p>
                <Link to='collections/all' className='bg-orange-600 hover:bg-red-700 transition duration-300 text-white  rounded-md px-6 py-3 sm:text-lg text-md'>Shop Now</Link>
            </div>
        </div>
    </section>
  )
}

export default Hero