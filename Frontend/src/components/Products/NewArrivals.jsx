import React, { useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import axios from 'axios';

function NewArrivals() {
    // state variables
    const scrollRef=useRef(null); // to create refrence to scrollable container
    // to enable/disable prev-next buttons (on extreme left and extreme right)
    const [canScrollLeft,setCanScrollLeft]=useState(false); //disabled by default 
    const [canScrollRight,setCanScrollRight]=useState(true);

    const [isDragging,setIsDragging]=useState(false); //to indicate whether the user can scroll the content or not 
    const [startX,setStartX] = useState(0);
    const [scrollLeft,setScrollLeft]=useState(false);





    const [newArrivals,setNewArrivals] = useState([]);

    useEffect(()=>{
      const fetchNewArrivals = async() =>{
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`);
          setNewArrivals(response.data)
        } catch (error) {
             console.error(error);
        }
      }
      fetchNewArrivals();
    },[])
    


    // function for scrolling when buttons are clicked
    function scroll(direction){   //it will take "left" or "right" as args and a/c scroll
        const scrollAmount=direction==="left"?-300:300
        scrollRef.current.scrollBy({left:scrollAmount,behaviour:'smooth'})  //scrollBy(x,y) or scrollBy(Options obj)
 
    }
   
    // Update scroll buttons
    function updateScrollButton(e){
        const container=scrollRef.current
        const scrollLeft=container.scrollLeft
        const scrollRight=container.scrollWidth>scrollLeft+container.clientWidth
        setCanScrollLeft(scrollLeft>0);
        setCanScrollRight(scrollRight);
    }

   useEffect(()=>{
    // to update the buttons on scroll event
    const container=scrollRef.current;
    if(container){
        container.addEventListener('scroll',updateScrollButton);
    }
    return ()=>container.removeEventListener('scroll',updateScrollButton);
   },[newArrivals])   
   
   // this functions are used when user want drag and scroll
   const handleMouseDown=(e)=>{
    //Indicates that dragging has started.
    setIsDragging(true);
    // capture the initial mouse position relative to the element
    setStartX(e.pageX-scrollRef.current.offsetLeft);
    // capture the initial horizontal scroll position of the element
    setScrollLeft(scrollRef.current.scrollLeft);
   }
   const handleMouseMove=(e)=>{
    if(!isDragging) return;

    // current mouse position relative to the element
    const x = e.pageX-scrollRef.current.offsetLeft;
    // Calculates how much the mouse has moved.
    const mouseMove=x-startX;//If mouseMove is positive, the mouse moved right,If mouseMove is negative, the mouse moved left.
    // Updates the scroll position based on movement.
    scrollRef.current.scrollLeft = scrollLeft - mouseMove;
    // subtraction moves the scroll in the opposite direction of the mouse movement(mouse moves left , it scrolls right, vice-versa)

   }
   const handleMouseUpOrLeave=()=>{
    
      setIsDragging(false);
   }


      
  return (
    <section className='px-4 lg:px-10 sm:py-10 py-4'>
        <div className='container mx-auto text-center mb-10 relative'>
            <h2 className='text-3xl font-bold mb-4'>
                 Explore New Arrivals
            </h2>
            <p className='text-lg text-gray-600 mb-8'>
            Discover the latest styles straight off the runway, freshly added to keep your wardrobe on the cutting edge of fashion.
            </p>
            {/* Scroll buttons */}
            <div className='absolute right-0 bottom-[-30px] flex space-x-2'>
                <button onClick={()=>scroll('left')} disabled={!canScrollLeft} className={`p-2 rounded border ${canScrollLeft?' bg-white text-black':"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    <FiChevronLeft className='text-2xl'/>
                </button>
                <button onClick={()=>scroll('right')} disabled={!canScrollRight} className={`p-2 rounded border ${canScrollRight?' bg-white text-black':"bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    <FiChevronRight className='text-2xl'/>
                </button>
            </div>
        </div>
        {/* Scrollable content */}
        <div ref={scrollRef} className={`container mx-auto overflow-x-scroll flex space-x-6 relative ${isDragging?'cursor-grabbing':'cursor-grab'}`}
        onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUpOrLeave} onMouseLeave={handleMouseUpOrLeave}
        >
             {
                newArrivals.map((product)=>(
                    <div key={product._id} className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                        <img src={product.images[0]?.url} draggable="false" alt={product.images[0]?.altText || product.name} className='w-full h-[500px] rounded-lg object-cover'/>
                        <div className='absolute bottom-0 left-0 right-0 backdrop-blur-xl text-white p-4 rounded-b-lg'>
                          <Link to={`/product/${product._id}`} className='block '>
                              <h4 className='font-medium'>{product.name}</h4>
                              <p className='mt-1'>$ {product.price}</p>
                          </Link>
                        </div>
                    </div>
                ))
             }
        </div>
    </section>
  )
}

export default NewArrivals;