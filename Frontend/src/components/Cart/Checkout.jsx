import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PaypalButton from "./PaypalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slice/checkoutSlice";
import axios from "axios";
import { toast } from "sonner";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  // this function will be responsible for sending request to backend and creating a checkout entry
  async function handleCreateCheckout(e) {
    e.preventDefault();
    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingInfo,
          paymentMethod: "Paypal",
          totalPrice: cart.totalPrice,
        })
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id); // set checkout id if checkout was successful
        toast.success(<b>Checkout created. Please make the payment now</b>, {
          duration: 2000,
        });
      }
    }
  }

  async function handlePaymentSuccess(details) {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      toast.success(<b>Payment successfull</b>, { duration: 2000 });

      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      toast.success(<b>Payment Unsuccessfull</b>, { duration: 2000 });
      console.error(error);
    }
  }

  async function handleFinalizeCheckout(checkoutId) {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      navigate("/order-confirmation");
      toast.success(<b>Order placed successfully</b>, { duration: 2000 });
    } catch (error) {
      toast.success(<b>Error placing order</b>, { duration: 2000 });
      console.error(error);
    }
  }

  if (loading) return <p>Loading cart ...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>Your cart is empty </p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto sm:py-10 py-5 sm:px-6 px-4 tracking-tighter">
      {/* Left section */}
      <div className="bg-white rounded-lg sm:p-6 p-1">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form action="" onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label htmlFor="" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full p-2 border rounded bg-gray-200"
              value={user ? user.email : ""}
              disabled
            />
          </div>
          <h3 className="text-lg mb-4 ">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4 ">
            <div>
              <label htmlFor="" className="block text-gray-700">
                First Name
              </label>
              <input
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    firstName: e.target.value,
                  })
                }
                type="text"
                className="w-full
                         p-2 border rounded"
                required
                value={shippingInfo.firstName}
              />
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700">
                Last Name
              </label>
              <input
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, lastName: e.target.value })
                }
                type="text"
                className="w-full
                         p-2 border rounded"
                required
                value={shippingInfo.lastName}
              />
            </div>
          </div>
          <div className="mb-4 ">
            <label htmlFor="" className="block text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={shippingInfo.address}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, address: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="" className="block text-gray-700">
                City
              </label>
              <input
                onChange={(e) =>
                  setShippingInfo({ ...shippingInfo, city: e.target.value })
                }
                type="text"
                className="w-full
                         p-2 border rounded"
                required
                value={shippingInfo.city}
              />
            </div>
            <div>
              <label htmlFor="" className="block text-gray-700">
                Postal Code
              </label>
              <input
                onChange={(e) =>
                  setShippingInfo({
                    ...shippingInfo,
                    postalCode: e.target.value,
                  })
                }
                type="text"
                className="w-full
                         p-2 border rounded"
                required
                value={shippingInfo.postalCode}
              />
            </div>
          </div>
          <div className="mb-4 ">
            <label htmlFor="" className="block text-gray-700">
              Country
            </label>
            <input
              type="text"
              value={shippingInfo.country}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, country: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4 ">
            <label htmlFor="" className="block text-gray-700">
              Phone
            </label>
            <input
              type="text"
              value={shippingInfo.phone}
              onChange={(e) =>
                setShippingInfo({ ...shippingInfo, phone: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                {/* Paypal component */}
                <PaypalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment Failed. Try again")}
                />
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section */}
      {loading?<CartShimmer/>:(
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="border-t border-gray-500 mb-4 py-4">
          {cart.products.map((product, index) => (
            <div
              key={index}
              className="flex items-start justify-between py-2 border-b border-gray-500"
            >
              <div className="flex items-start">
                <img
                  src={product.image}
                  alt={product.name}
                  className="sm:w-20 sm:h-24 w-15 h-15 rounded-md object-cover mr-4"
                />
                <div>
                  <h3 className="sm:text-lg text-md">{product.name}</h3>
                  <div className="flex flex-row space-x-2 flex-wrap ">
                  <p className="text-gray-500  ">Size: {product.size}</p>
                  <p className="text-gray-500 ">Color: {product.color}</p>
                  <p className="text-gray-500 ">Qty: {product.quantity}</p>
                  </div>
                </div>
              </div>
              <p className="sm:text-xl text-md font-medium">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>Subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg ">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 pt-4 border-t border-gray-500">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>)}
    </div>
  );
}

export function CartShimmer() {
  return (
    <div className="bg-gray-50 p-6 rounded-lg animate-pulse">
      <div className="h-4 mb-4 bg-gray-200 rounded w-1/4"></div>
      <div className="border-t border-gray-500 mb-4 py-4">
        <div className="flex items-start justify-between py-2 border-b border-gray-500">
          <div className="flex items-start">
            <div className="w-20 h-24 bg-gray-200 mr-4"></div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="flex justify-between items-center text-lg mb-4">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
      <div className="flex justify-between items-center text-lg">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
      <div className="flex justify-between items-center text-lg mt-4 pt-4 border-t border-gray-500">
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}

export default Checkout;
