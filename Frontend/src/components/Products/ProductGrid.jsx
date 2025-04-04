import React from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Common/Loader";
import NoProductFound from '../../assets/noProductFound.avif'
import ProductGridShimmer from "./ProductGridShimmer";

function ProductGrid({ products, loading, error }) {
  if (loading) {
    // <p>Loading...</p>
   return <ProductGridShimmer />;
  }
  if (error) {
   return <p>Error: {error}</p>;
  }
  if (products && products.length < 1) {
    return (
      <div className="max-w-sm mx-auto">
        <img src={NoProductFound} alt="" />
        <h1 className="text-center font-semibold text-2xl">
          No products found
        </h1>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <Link key={index} to={`/product/${product._id}`} className="block">
          <div className="bg-white p-4 rounded-lg">
            <div className="w-full h-96 mb-4">
              <img
                src={product.images[0].url}
                alt={product.images[0].altText || product.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex items-center justify-between">
            <h3 className="text-sm ">{product.name}</h3>
            <p className="text-sm tracking-tighter font-medium text-gray-500">
              ${product.price}
            </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProductGrid;
