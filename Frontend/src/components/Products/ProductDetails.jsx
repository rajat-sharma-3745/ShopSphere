import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slice/productsSlice";
import { addToCart } from "../../redux/slice/cartSlice";
import ProductDetailsShimmer from "./ProductDetailsShimmer";
import StarRating from "./StarRating";

function ProductDetails({ productId }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedProduct, similarProducts, loading, error } = useSelector(
    (state) => state.products
  );
  const { user, guestId } = useSelector((state) => state.auth);
  const [mainImg, setMainImg] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts({ id: productFetchId }));
    }
  }, [dispatch, productFetchId]);

  function handleAddToCart() {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select the size or color before adding to cart.", {
        duration: 1000,
      });
      return;
    }
    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity,
        size: selectedSize,
        color: selectedColor,
        userId: user?._id,
        guestId,
      })
    )
      .then(() => {
        toast.success("Product added to cart", {
          duration: 1000,
        });
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  }
  useEffect(() => {
    // check and set the first image
    if (selectedProduct?.images?.length > 0) {
      setMainImg(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  function handleQuantityChange(action) {
    if (action === "minus" && quantity > 1) setQuantity((p) => p - 1);
    if (action === "plus") setQuantity((p) => p + 1);
  }

  if (loading) {
    return <ProductDetailsShimmer />;
  }
  if (error) {
    <p>Error: {error}</p>;
  }
  return (
    <div className="sm:p-6">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white md:p-8 p-4 rounded-lg">
          <div className="flex flex-col md:flex-row">
            {/* left thumbnail */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image?.url}
                  alt={image?.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover object-top rounded-lg cursor-pointer border ${
                    mainImg === image.url
                      ? "border-black border-2"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImg(image.url)}
                />
              ))}
            </div>
            {/* Main image */}
            <div className="md:w-1/2">
              <div className="flex justify-end mb-4">
              <button
                  onClick={() => navigate(-1)}
                  className="cursor-pointer md:hidden text-blue-600 hover:underline flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              </div>
              <div className="mb-4">
                <img
                  src={mainImg || selectedProduct.images[0].url}
                  alt="Main Product"
                  className="w-full h-auto object-cover rounded-lg border border-orange-400 shadow-md"
                />
              </div>
            </div>
            {/* Mobile Thumbnail */}
            <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
              {selectedProduct.images.map((image, index) => (
                <img
                  key={index}
                  src={image?.url}
                  alt={image?.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover object-top rounded-lg cursor-pointer border ${
                    mainImg === image.url
                      ? "border-black border-2"
                      : "border-gray-300"
                  }`}
                  onClick={() => setMainImg(image.url)}
                />
              ))}
            </div>

            {/* Right Section */}
            <div className="md:w-1/2 md:ml-10">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl md:text-3xl font-semibold ">
                  {selectedProduct.name}
                </h1>
                <button
                  onClick={() => navigate(-1)}
                  className="cursor-pointer hidden text-blue-600 hover:underline md:flex items-center"
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Back
                </button>
              </div>
              <p className="text-lg text-gray-600 mb-1 line-through">
                {selectedProduct.originalPrice &&
                  `${selectedProduct.originalPrice}`}
              </p>
              <p className="text-xl text-gray-700 mb-2 font-bold">
                $ {selectedProduct.price}
              </p>
              <div className="text-xl  mb-2 ">
                {
                  <StarRating
                    rating={selectedProduct.rating}
                    reviews={selectedProduct.numReviews}
                  />
                }
              </div>
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border ${
                        selectedColor === color
                          ? "border-5 border-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.toLocaleLowerCase(),
                        filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border border-gray-400 ${
                        selectedSize === size ? "text-white bg-black" : ""
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <p className="text-gray-700">Quantity</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    onClick={() => handleQuantityChange("minus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange("plus")}
                    className="px-2 py-1 bg-gray-200 rounded text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-black text-white py-2 px-6 rounded w-full sm:mb-4 ${
                  isButtonDisabled
                    ? "cursor-not-allowed bg-black/50"
                    : "hover:bg-gray-900"
                }`}
              >
                {isButtonDisabled ? "Adding..." : "ADD TO CART"}
              </button>
              <div className="mt-10 text-gray-700">
                <h3 className="text-xl font-bold sm:mb-4 mb-2">
                  Characteristics:
                </h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="sm:mt-20 mt-8">
            <h2 className="text-2xl text-center font-medium mb-4">
              You May Also Like
            </h2>
            <ProductGrid
              products={similarProducts}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
