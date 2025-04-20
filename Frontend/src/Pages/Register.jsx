import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../assets/register.webp";
import register2 from "../assets/register2.jpg";
import { registerUser } from "../redux/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { mergeCart } from "../redux/slice/cartSlice";
import { AiFillEye, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from "sonner";
import a1 from '../slider images/1.jpg'
import a2 from '../slider images/2.jpg'
import a3 from '../slider images/3.jpg'
import a4 from '../slider images/4.jpg'
import a5 from '../slider images/5.jpg'
import a6 from '../slider images/6.jpg'
import a7 from '../slider images/7.jpg'
import a8 from '../slider images/8.jpg'
import a9 from '../slider images/9.jpg'
import a10 from '../slider images/10.jpg'
import a11 from '../slider images/11.jpg'
import a12 from '../slider images/12.jpg'
import a13 from '../slider images/13.jpg'
import a14 from '../slider images/14.jpg'
import a15 from '../slider images/15.jpg'
import a16 from '../slider images/16.jpg'
import a17 from '../slider images/17.jpg'
import a18 from '../slider images/18.jpg'
import a19 from '../slider images/19.jpg'
import a20 from '../slider images/20.jpg'
import a21 from '../slider images/21.jpg'
import a22 from '../slider images/22.jpg'
import a23 from '../slider images/23.jpg'
import a24 from '../slider images/24.jpg'
import a25 from '../slider images/25.jpg'
import a26 from '../slider images/26.jpg'
import a27 from '../slider images/27.jpg'
import a28 from '../slider images/28.jpg'
import a29 from '../slider images/29.jpg'
import a30 from '../slider images/30.jpg'
import a31 from '../slider images/31.jpg'
import a32 from '../slider images/32.jpg'
import a33 from '../slider images/33.jpg'
import a34 from '../slider images/34.jpg'
import a35 from '../slider images/35.jpg'
import a36 from '../slider images/36.jpg'
import a37 from '../slider images/37.jpg'


function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); //get info about the current url
  const { user, guestId, isLoading } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  //Get redirect parameter and check if its checkout or something
  const redirect = new URLSearchParams(location.search).get("redirect") || "/"; // location.search means the query string
  const isCheckoutRedirect = redirect.includes("checkout");

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
    if(!name || !email || !password || !avatar){
      toast.info("All fields are required")
      return;
    }
    if(password.length<6){
      toast.info('Password must of atleast 6 characters'); 
      return;
  }
  const formData = new FormData();
  formData.append('name',name);
  formData.append('email',email);
  formData.append('password',password);
  formData.append('avatar',avatar);
    dispatch(registerUser(formData)).then(()=>{toast.success('User registered successfully')});
  }

  const imgs = [
    a1,
    a2,
    a3,
    a4,
    a5,
    a6,
    a7,
    a8,
    a9,
   a10,
   a11,
   a12,
   a13,
   a14,
   a15,
   a16,
   a17,
   a18,
   a19,
   a20,
   a21,
   a22,
   a23,
   a24,
   a25,
   a26,
   a28,
   a29,
   a30,
   a31,
   a32,
   a33,
   a34,
   a35,
   a36,
   a27,
   a37,

  ]
  return (

    // <div className="flex">
    //   <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12 ">
    //     <form
    //       onSubmit={handleSubmit}
    //       className="w-full max-w-md bg-white p-4 rounded-lg border border-gray-300 shadow-xl"
    //     >
    //       <div className="flex justify-center sm:mb-3 mb-2">
    //         <h2 className="text-xl font-medium">ShopSphere</h2>
    //       </div>
    //       <h2 className="text-2xl font-bold text-center sm:mb-3 mb-2">
    //         Hey there! 👋
    //       </h2>
    //       <p className='text-center sm:mb-3 '>
    //       Join us & shop the trendiest styles!
    //             </p>
    //       <div className="mb-4">
    //         <label htmlFor="" className="block text-sm font-semibold mb-2">
    //           Name
    //         </label>
    //         <input
    //           type="text"
    //           value={name}
    //           onChange={(e) => setName(e.target.value)}
    //           placeholder="Enter your name"
    //           className="w-full p-2 border rounded  border-gray-400 focus:border-2 focus:border-black focus:outline-none"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="" className="block text-sm font-semibold mb-2">
    //           Profile Pic
    //         </label>
    //         <input
    //           type="file"
    //           onChange={(e) => setAvatar(e.target.files[0])}
    //           placeholder="Enter your name"
    //           className="w-full p-2 border rounded  border-gray-400 focus:border-2 focus:border-black focus:outline-none"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="" className="block text-sm font-semibold mb-2">
    //           Email
    //         </label>
    //         <input
    //           type="email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //           placeholder="Enter your email address"
    //           className="w-full p-2 border rounded  border-gray-400 focus:border-2 focus:border-black focus:outline-none"
    //         />
    //       </div>
    //       <div className="mb-4">
    //         <label htmlFor="" className="block text-sm font-semibold mb-2">
    //           Password
    //         </label>
    //         <div className="relative">
    //           <input
    //             type={showPassword ? "text" : "password"}
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //             className="w-full p-2 border rounded  border-gray-400 focus:border-2 focus:border-black focus:outline-none "
    //             placeholder="Enter your password"
    //           />
    //           <button
    //             type="button"
    //             onClick={() => setShowPassword((p) => !p)}
    //             className="absolute right-2 top-2 text-black"
    //           >
    //             {" "}
    //             {!showPassword ? (
    //               <AiOutlineEye size={25} />
    //             ) : (
    //               <AiOutlineEyeInvisible size={25} />
    //             )}{" "}
    //           </button>{" "}
    //         </div>
    //       </div>
    //       <button
    //         type="submit"
    //         className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
    //       >
    //         {loading ? "Loading..." : "Sign Up"}
    //       </button>
    //       <p className="mt-6 text-center text-sm">
    //         Already have an account?{" "}
    //         <Link
    //           to={`/login?redirect=${encodeURIComponent(redirect)}`}
    //           className="text-blue-500"
    //         >
    //           Login
    //         </Link>
    //       </p>
    //     </form>
    //   </div>
    //   <div className="hidden md:block w-1/2 bg-gray-800 ">
    //     <div className="h-full flex flex-col justify-center items-center">
    //       <img
    //         src={register2}
    //         alt="Register"
    //         className="h-[680px] w-full object-cover "
    //       />
    //     </div>
    //   </div>
    // </div>
    
    <div className="flex md:min-h-screen w-screen">
      <div className="fixed -z-1 inset-0" style={{background: 'linear-gradient(rgb(119, 198, 248) 0%, rgb(255, 255, 255) 50%)'}}></div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 md:p-12 pt-10 ">
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
           <p className='text-center sm:mb-3 mb-1 '>
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
             className="w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer"
           >
             {isLoading?"Signing up...":"Sign up"}
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
      <div className="hidden md:block fixed right-0 top-0 origin-top-right -rotate-[15deg] scale-105 translate-y-[-13vw]  w-[53vw] columns-4 gap-2 animate-marquee-vertical">
      <div className="p-1 ">
          {imgs.map((img, index)=>(
            <img key={index} src={img} alt="" loading="eager" className="w-full mb-4 rounded-md " />
          ))}
       </div>
      </div>

    </div>
  );
}

export default Register;
