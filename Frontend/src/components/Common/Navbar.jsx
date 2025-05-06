import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {HiOutlineUser,HiOutlineShoppingBag,HiBars3BottomRight} from 'react-icons/hi2'
import SearchBar from './SearchBar'
import CartDrawer from '../Layout/CartDrawer'
import { IoMdClose } from 'react-icons/io'
import { useSelector } from 'react-redux'
import Logo from '../../assets/logo.png'

function Navbar() {
  const {user} = useSelector((state)=>state.auth);
  const [drawerOpen,setDrawerOpen]=useState(false) 
  // for small screens 
  const [navDrawerOpen,setNavDrawerOpen]=useState(false);

  const {cart} = useSelector((state)=>state.cart);
  const cartItemCount = cart?.products?.reduce((total,product)=>total+product.quantity,0) ||0
  const {search} = useLocation();

  const isActive = (matchQuery) => {
    // console.log(search);
   return search.includes(matchQuery);
  }
  function toggleNavDrawer(){
    setNavDrawerOpen(p=>!p);
  }
  function toggleCartDrawer(){
    setDrawerOpen(p=>!p);
  }
  return (
    <>
    <nav className='container mx-auto flex justify-between items-center sm:py-4 py-2.5 md:px-4 px-1.5 '>
        {/* Left-logo */}
        <div>
          {/* <img src={Logo} className='w-25 h-12 object-cover' alt="" /> */}
            <Link to='/' className='md:text-2xl text-md font-semibold flex items-center'><img src={Logo} className='w-9 h-8 object-cover' alt="" />
            ShopSphere</Link>
        </div>   
        {/*center links  */}
        <div className='hidden md:flex lg:space-x-6 space-x-3'>
            <NavLink to="/collections/all?gender=Men" className={() =>` hover:text-[#e63946] hover:border-b-2 hover:border-b-orange-600 text-sm font-medium uppercase ${isActive('gender=Men') ? 'text-[#e63946] border-b-2 border-b-orange-600' : 'text-gray-700'}`}>
              Men
            </NavLink>
            <NavLink to="/collections/all?gender=Women" className={() =>` hover:text-[#e63946] hover:border-b-2 hover:border-b-orange-600 text-sm font-medium uppercase ${isActive('gender=Women') ? 'text-[#e63946] border-b-2 border-b-orange-600' : 'text-gray-700'}`}>
              Women
            </NavLink>
            <NavLink to="/collections/all?category=Top Wear" className={() =>` hover:text-[#e63946] hover:border-b-2 hover:border-b-orange-600 text-sm font-medium uppercase ${isActive('category=Top%20Wear') ? 'text-[#e63946] border-b-2 border-b-orange-600' : 'text-gray-700'}`}>
              Top Wear
            </NavLink>
            <NavLink to="/collections/all?category=Bottom Wear" className={() =>` hover:text-[#e63946] hover:border-b-2 hover:border-b-orange-600 text-sm font-medium uppercase ${isActive('category=Bottom%20Wear') ? 'text-[#e63946] border-b-2 border-b-orange-600' : 'text-gray-700'}`}>
              Bottom Wear
            </NavLink>


        </div>
        {/* icons */}
        <div className='flex items-center sm:space-x-4 space-x-2'>
          {user && user.role==="admin" && (
             <Link to="/admin" className='block bg-black px-2 py-1 rounded text-sm text-white'>Admin </Link>
          )}
           
            <Link to='/profile' className='hover:text-black'> <HiOutlineUser className='h-6 w-6 text-gray-700'/> </Link>
            <button onClick={toggleCartDrawer} className='relative hover:text-black cursor-pointer'>
                <HiOutlineShoppingBag className='w-6 h-6 text-gray-700  sm:mr-0'/>
                {cartItemCount>0 && (
                  <span className='absolute -top-1 bg-rabbit-red text-white text-xs rounded-full sm:px-2 px-1.5 py-0.5'>{cartItemCount}</span>
                
                )}
            </button>
            {/* search */}
            <SearchBar/>

            <button onClick={toggleNavDrawer} className='md:hidden'>
                <HiBars3BottomRight className='h-6 w-6 text-gray-700'/>
            </button>
        </div>
    </nav>
    <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer}/>

    {/* Mobile navigation */}
    <div className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-full bg-white shadow-lg transform transition duration-300 z-50 
      ${navDrawerOpen?'translate-x-0':'-translate-x-full'}`}>
        <div className='flex justify-end p-4'>
          <button onClick={toggleNavDrawer}>
            <IoMdClose className='w-6 h-6 text-gray-600 '/>
          </button>
        </div>
        {/* nav links */}
        <div className='p-4'>
          <h2 className='text-xl font-semibold mb-4'>Menu</h2>
          <nav className='space-y-4'>
            <Link to="/collections/all?gender=Men" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Men</Link>
            <Link to="/collections/all?gender=Women" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Women</Link>
            <Link to="/collections/all?category=Top Wear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Top Wear</Link>
            <Link to="/collections/all?category=Bottom Wear" onClick={toggleNavDrawer} className='block text-gray-600 hover:text-black'>Bottom Wear</Link>
          </nav>
        </div>
      </div>
    </>

  )
}

export default Navbar