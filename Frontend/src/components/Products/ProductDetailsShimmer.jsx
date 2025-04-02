


function ProductDetailsShimmer(){
    return <div className='p-6 animate-pulse'>
    <div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
        <div className='flex flex-col md:flex-row'>
            
           
            {/* <div className='hidden md:flex flex-col space-y-4 mr-6'>
                <div className='h-20 w-20 bg-gray-200 rounded mb-1'></div>
                <div className='h-20 w-20 bg-gray-200 rounded mb-1'></div>
                <div className='h-20 w-20 bg-gray-200 rounded mb-1'></div>
            </div> */}
               
            
            <div className="md:w-1/2">
                <div className='mb-4'>
                    <div className='h-96 w-full bg-gray-200 rounded'></div>
                </div>
            </div>
                
           
            <div className='md:hidden flex overflow-x-scroll space-x-4 mb-4'>
                <div className='h-20 w-20 bg-gray-200 rounded'></div>
                <div className='h-20 w-20 bg-gray-200 rounded'></div>
                <div className='h-20 w-20 bg-gray-200 rounded'></div>
            </div>

            
            <div className='md:w-1/2 md:ml-10'>
                 <div className='h-6 bg-gray-200 rounded w-3/4 mb-2'></div>
                 <div className='h-4 bg-gray-200 rounded w-1/4 mb-1'></div>
                 <div className='h-6 bg-gray-200 rounded w-1/4 mb-2'></div>
                 <div className='h-24 bg-gray-200 rounded w-full mb-4'></div>
                 <div className='h-24 bg-gray-200 rounded w-full'></div>
             </div>
        </div>
    </div>
</div>
}
export default ProductDetailsShimmer