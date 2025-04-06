import React from 'react'
const words = ['Exclusive', 'Timeless', 'Ethical'];
function SlidingBanner() {
  return (
    <div className='overflow-hidden bg-black border-y border-white mb-10'>
        <div className='animate-marquee w-max whitespace-nowrap flex text-white text-4xl transition duration-1000 font-semibold py-4'>
            {[...Array(6)].map((_,i)=>(
                <div key={i} className='flex gap-8 mx-4'>
                    {words.map((word,index)=>(
                        <span key={index} className='flex items-center gap-4'>
                            ✦ <span>{word}</span>
                        </span>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default SlidingBanner