import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { RiTwitterLine, RiTwitterXLine } from 'react-icons/ri'
import { FiPhoneCall } from 'react-icons/fi'
import { TbBrandMeta } from 'react-icons/tb'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='border-t py-12 lg:px-14 px-4 '>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 lg:px-0 place-items-center'>
            <div>
                 <h3 className='text-lg text-gray-800 mb-4'>Newsletter</h3>
                 <p className='text-gray-500 mb-4'>
                    Be the first to hear about new products, exclusive events, and online offers 
                 </p>
                 <p className='font-medium text-sm text-gray-600 mb-6'>
                    Sign up and get 10% off on your first order
                 </p>
                 {/* newsletter form */}
                 <form className='flex'>
                    <input type="email" placeholder='Enter your email' className='p-3 w-full text-sm border-b border-l border-t border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all' required />
                    <button type='submit' className='bg-black text-white px-6 py-3 text-sm rounded-r-md hover:bg-gray-800 transition-all'>Subscribe</button>
                 </form>
            </div>
            {/* Shop links */}
            <div>
               <h3 className='text-lg text-gray-800 mb-4 '>Shop</h3>
               <ul className='space-y-2 text-gray-600'>
                <li>
                    <Link to="#" className='hover:text-gray-500'>Men's Top Wear</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500'>Women's Top Wear</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500'>Men's Bottom Wear</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500'>Women's Bottom Wear</Link>
                </li>

               </ul>
            </div>
            {/* support links */}
            <div>
               <h3 className='text-lg text-gray-800 mb-4 '>Support</h3>
               <ul className='space-y-2 text-gray-600'>
                <li>
                    <Link to="#" className='hover:text-gray-500'>Contact Us</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500'>About Us</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500'>FAQs</Link>
                </li>
                <li>
                    <Link to="#" className='hover:text-gray-500'>Features</Link>
                </li>

               </ul>
            </div>
            {/*Follow us  */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4 '>Follow Us</h3>
                <div className='flex items-center space-x-4 mb-6'>
                    <a href="www.facebook.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'><TbBrandMeta className='w-5 h-5'/></a>
                    <a href="www.instagram.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'><IoLogoInstagram className='w-5 h-5'/></a>
                    <a href="www.x.com" target='_blank' rel='noopener noreferrer' className='hover:text-gray-500'><RiTwitterXLine className='w-4 h-4'/></a>
                </div>
                <p className='text-gray-500'>Call Us</p>
                <p>
                    <FiPhoneCall className='inline-block mr-2 '/>
                    0123-456-789
                </p>
            </div>
        </div>
       {/* Footer Bottom */}
       <div className='container mx-auto mt-12 px-4 lg:px-0 pt-6 border-t border-gray-200'>
          <p className='text-gray-500 text-center text-sm tracking-tighter'>©2025, ABC. All Rights Reserved.</p>
       </div>
    </footer>
  )
}

export default Footer