import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/register.webp";
import register2 from "../assets/register2.jpg";
import { registerUser } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slice/cartSlice";
import { AiFillEye, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from "sonner";


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); //get info about the current url
  const { user, guestId, loading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  //Get redirect parameter and check if its checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/"; // location.search means the query string
  const isCheckoutRedirect = redirect.includes("/checkout");

  useEffect(() => {
    if (user) {
      if (cart?.products.length > 0 && guestId) {
        dispatch(mergeCart({ user, guestId })).then(() => {
          navigate(isCheckoutRedirect ? "/checkout" : "/");
        });
      } else {
        navigate(isCheckoutRedirect ? "/checkout" : "/");
      }
    }
  }, [user, guestId, cart, isCheckoutRedirect, dispatch, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if(password.length<6){
      toast.info('Password must of atleast 6 characters',{duration:2000}); 
      return;
  }
  const formData = new FormData();
  formData.append('name',name);
  formData.append('email',email);
  formData.append('password',password);
  formData.append('avatar',avatar);
    dispatch(registerUser(formData)).then(()=>{toast.success('User registered successfully')});
  }
  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 ">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-4 rounded-lg border border-gray-300 shadow-xl"
        >
          <div className="flex justify-center sm:mb-3 mb-2">
            <h2 className="text-xl font-medium">ShopSphere</h2>
          </div>
          <h2 className="text-2xl font-bold text-center sm:mb-3 mb-2">
            Hey there! 👋
          </h2>
          <p className='text-center sm:mb-3 '>
          Join us & shop the trendiest styles!
                </p>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded  border-gray-400 focus:border-2 focus:border-black focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Profile Pic
            </label>
            <input
              type="file"
              onChange={(e) => setAvatar(e.target.files[0])}
              placeholder="Enter your name"
              className="w-full p-2 border rounded  border-gray-400 focus:border-2 focus:border-black focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="w-full p-2 border rounded  border-gray-400 focus:border-2 focus:border-black focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="" className="block text-sm font-semibold mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded  border-gray-400 focus:border-2 focus:border-black focus:outline-none "
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-2 top-2 text-black"
              >
                {" "}
                {!showPassword ? (
                  <AiOutlineEye size={25} />
                ) : (
                  <AiOutlineEyeInvisible size={25} />
                )}{" "}
              </button>{" "}
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link
              to={`/login?redirect=${encodeURIComponent(redirect)}`}
              className="text-blue-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800 ">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register2}
            alt="Register"
            className="h-[680px] w-full object-cover "
          />
        </div>
      </div>
    </div>
  );
}

export default Register;
