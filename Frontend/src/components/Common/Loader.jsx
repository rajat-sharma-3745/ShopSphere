import React from "react";

export const LoadingPulse = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative inline-flex">
        {/* <div className="w-8 h-8 bg-blue-500 rounded-full"></div> */}
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
        <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
      </div>
    </div>
  );
};



const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
     
        

        
          {/* <div className="w-20 h-20 rounded-full absolute border-8 border-solid border-gray-200"></div> */}
          <div className="w-20 h-20 rounded-full animate-spin  border-5 border-solid border-t-cyan-500 border-gray-200 "></div>
        
     
    </div>
  );
};

export default LoadingSpinner;

