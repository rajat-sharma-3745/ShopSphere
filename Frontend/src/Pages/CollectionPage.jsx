import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from 'react-icons/fa'
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions, { CustomSort } from '../components/Products/SortOptions';
import ProductGrid from '../components/Products/ProductGrid';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductsByFilters } from '../redux/slice/productsSlice';

function CollectionPage() {
  const {collection} = useParams(); 
  const [searchParams] = useSearchParams();//we can the query params
  const dispatch = useDispatch();
  const {products,loading,error} = useSelector((state)=>state.products); //retrieve the current state
  const queryParams = Object.fromEntries([...searchParams]); //convert query params in to object for easy use
  // const [products,setProducts]=useState([]);

  useEffect(()=>{
    dispatch(fetchProductsByFilters({collection,...queryParams}))
  },[dispatch,collection,searchParams]);  //dispatch an action to the store to update the state


  const sidebarRef=useRef(null);
  const [isSidebarOpen,setIsSidebarOpen]=useState(false);
  const toggleSidebar=()=>{
    setIsSidebarOpen(!isSidebarOpen);
  }

  //close sidebar if clicked outside
  function handleClickOutside(e){
  if(sidebarRef.current && !sidebarRef.current.contains(e.target)){
     setIsSidebarOpen(false);
  }
  }
  useEffect(()=>{
    document.addEventListener('mousedown',handleClickOutside);
    return ()=> document.removeEventListener('mousedown',handleClickOutside);
  },[])

  
  return (
    <div className='flex flex-col lg:flex-row'>
        {/* Filter sidebar */}
        <div ref={sidebarRef} className={`${isSidebarOpen?'translate-x-0':'-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white transition-transform duration-300 shadow-md lg:static lg:translate-x-0`}>
            <FilterSidebar close={toggleSidebar}/>
        </div>
        {/* overlay */}
        {isSidebarOpen&&  (
          <div className='fixed inset-0 w-full h-full bg-black/9 '></div>
        )}
        {/* Right part */}
        <div className='grow p-4 '>
          <div className='flex items-center justify-between mb-2 px-4'>
              <h2 className='hidden md:block text-2xl font-bold'>All Collections</h2>
              <button onClick={toggleSidebar} className='md:hidden border border-gray-300 flex p-3.5 rounded-md'>
              <FaFilter className=' '/>
              </button>
            <CustomSort/>
          </div>
            {/* sort  */}
            {/* <SortOptions/> */}

            {/* Product grid */}
            <ProductGrid products={products} loading={loading} error={error}/>
        </div>
    </div>
  )
}

export default CollectionPage