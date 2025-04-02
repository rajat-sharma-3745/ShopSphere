function OrderDetailsShimmer() {
  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
      <div className="rounded-lg border p-4 sm:p-6">
        <div className="flex flex-col justify-between md:flex-row mb-8">
          <div className="w-1/2">
            <div className="h-6 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="flex flex-col items-start sm:items-end mt-4 sm:mt-0 w-full">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
          <div>
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
        <div className="overflow-x-auto ">
          <div className="h-5 bg-gray-200 rounded w-1/3 mb-4"></div>
          <table className="min-w-full h-32 bg-gray-200 rounded mb-4"></table>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );
}

export default OrderDetailsShimmer;
