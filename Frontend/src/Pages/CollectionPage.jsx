import React, { useEffect, useRef, useState } from 'react'
import {FaFilter} from 'react-icons/fa'
import FilterSidebar from '../components/Products/FilterSidebar';
import SortOptions from '../components/Products/SortOptions';
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

  // useEffect(()=>{
  //   setTimeout(()=>{
  //       const fetchedProducts = [
  //           {
  //             _id: 1,
  //             name: "Product 1",
  //             price: 100,
  //             images: [{ url: "https://picsum.photos/500/500?random=9" }],
  //           },
  //           {
  //             _id: 2,
  //             name: "Product 2",
  //             price: 100,
  //             images: [{ url: "https://picsum.photos/500/500?random=10" }],
  //           },
  //           {
  //             _id: 3,
  //             name: "Product 3",
  //             price: 100,
  //             images: [{ url: "https://picsum.photos/500/500?random=11" }],
  //           },
  //           {
  //             _id: 4,
  //             name: "Product 4",
  //             price: 100,
  //             images: [{ url: "https://picsum.photos/500/500?random=12" }],
  //           },
  //           {
  //             _id: 5,
  //             name: "Product 1",
  //             price: 100,
  //             images: [{ url: "https://picsum.photos/500/500?random=5" }],
  //           },
  //           {
  //             _id: 6,
  //             name: "Product 2",
  //             price: 100,
  //             images: [{ url: "https://picsum.photos/500/500?random=6" }],
  //           },
  //           {
  //             _id: 7,
  //             name: "Product 3",
  //             price: 100,
  //             images: [{ url: "https://picsum.photos/500/500?random=7" }],
  //           },
  //           {
  //             _id: 8,
  //             name: "Product 4",
  //             price: 100,
  //             images: [{ url: "https://picsum.photos/500/500?random=8" }],
  //           },
  //       ];
  //       setProducts(fetchedProducts);

  //   },1000);
  // },[])
  return (
    <div className='flex flex-col lg:flex-row'>
        {/* Mobile filter button */}
        <button onClick={toggleSidebar} className='lg:hidden border flex justify-center items-center p-2'>
            <FaFilter className='mr-2 '/>
        </button>

        {/* Filter sidebar */}
        <div ref={sidebarRef} className={`${isSidebarOpen?'translate-x-0':'-translate-x-full'} fixed inset-y-0 left-0 z-50 w-64 overflow-y-auto bg-white transition-transform duration-300 lg:shadow-md lg:static lg:translate-x-0`}>
            <FilterSidebar/>
        </div>
        <div className='grow p-4'>
            <h2 className='text-2xl  font-semibold uppercase'>All Collections</h2>
            {/* sort  */}
            <SortOptions/>

            {/* Product grid */}
            <ProductGrid products={products} loading={loading} error={error}/>
        </div>
    </div>
  )
}

export default CollectionPage