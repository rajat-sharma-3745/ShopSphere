import React from 'react'
import { useSearchParams } from 'react-router-dom'

function SortOptions() {

  const [searchParams,setSearchParams] = useSearchParams();
  
  // when user selects one of the option, we will set it in the url query string , the value of the select will be retrieved from search params so that when user refreshes , the selected option remains same
  function handleSortChange(e){
    const sortBy=e.target.value;
    searchParams.set('sortBy',sortBy);
    setSearchParams(searchParams)
  }
  return (
    <div className='mb-4 flex justify-end items-center'>
      <select name="" id="sort" value={searchParams.get('sortBy')||""}  onChange={handleSortChange} className='border p-2 rounded-md focus:outline-none'>
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  )
}

export default SortOptions;