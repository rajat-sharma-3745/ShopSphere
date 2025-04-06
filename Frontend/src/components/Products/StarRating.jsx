import React from 'react'
import { FaAsterisk } from 'react-icons/fa';

function StarRating({rating, reviews, outOf = 5}) {
    const stars = [];//to store all the spans containing stars, we cannot put for loop directly inside jsx , jsx only allows expressions ,not full statements like for, so we build the list of spans in the array and then return it to render

    for (let i = 1; i <= outOf; i++) {
        if(rating>=i){  //4.5 is greater than 1,2,3,4 so 4 full stars
            stars.push(<span key={i} className={`text-yellow-400 text-xl`}>★</span>)
        }
        else if (rating >= i - 0.5) {
            stars.push(
              <span key={i} className={`relative text-xl text-gray-300`}>
                <span className="absolute left-0 w-1/2 overflow-hidden text-yellow-400">★</span>
                ★
              </span>
            );
          } else {
            stars.push(
              <span key={i} className={`text-gray-300 text-xl`}>★</span>
            );
          }
    }

    return (<>
        <div className="flex items-center gap-0.5">
          {stars}
          <span className="text-sm text-gray-500 ml-2">({rating}) {reviews} reviews</span>
        </div>
        {/* <div className='flex items-center'>
            {   
                [...Array(outOf)].map((_,i)=>{
                    const starIdx = i+1;

                   return <span key={i} className={`text-xl ${rating>=starIdx?"text-yellow-400":rating>=starIdx-0.5?'relative text-gray-300':'static'}`}>
                        {rating>=starIdx-0.5 ? <span className="absolute left-0 w-1/2 overflow-hidden text-yellow-400">★</span>:""}
                        ★
                    </span>
})
            }
        </div> */}
        </>
      );

}

export default StarRating