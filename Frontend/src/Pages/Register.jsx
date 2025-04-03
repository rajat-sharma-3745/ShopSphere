import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import register from '../assets/register.webp'
import { registerUser} from '../redux/slice/authSlice'
import { useDispatch, useSelector } from 'react-redux';
import { mergeCart } from '../redux/slice/cartSlice';

function Register() {
  const [name,setName]=useState(''); 
  const [email,setEmail]=useState(''); 
  const [password,setPassword]=useState(''); 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); //get info about the current url
  const {user,guestId,loading} = useSelector((state)=>state.auth);
  const {cart} = useSelector((state)=>state.cart);

  //Get redirect parameter and check if its checkout or something
  const redirect = new URLSearchParams(location.search).get('redirect') || "/"  // location.search means the query string
  const isCheckoutRedirect = redirect.includes('/checkout');


  useEffect(()=>{
 
    if(user){
        if(cart?.products.length>0 && guestId){
            dispatch(mergeCart({user,guestId})).then(()=>{
                navigate(isCheckoutRedirect?'/checkout':'/')
            })
        }
        else{
            navigate(isCheckoutRedirect?'/checkout':'/')
        }
    }
  },[user,guestId,cart,isCheckoutRedirect,dispatch,navigate])

  function handleSubmit(e){
    e.preventDefault();
    dispatch(registerUser({name,email,password}))
  }
  return (
    <div className='flex'>
        <div className='w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-12'>
            <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-4 rounded-lg border shadow-sm'>
                <div className='flex justify-center sm:mb-6 mb-2'>
                    <h2 className='text-xl font-medium'>ShopSphere</h2>
                </div>
                <h2 className='text-2xl font-bold text-center sm:mb-6 mb-2'>Hey there! 👋</h2>
                {/* <p className='text-center sm:mb-6 mb-2'>
                    Enter your username and password to login
                </p> */}
                <div className='mb-4'>
                    <label htmlFor="" className='block text-sm font-semibold mb-2'>Name</label>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder='Enter your name' className='w-full p-2 border rounded'/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='block text-sm font-semibold mb-2'>Email</label>
                    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Enter your email address' className='w-full p-2 border rounded'/>
                </div>
                <div className='mb-4'>
                    <label htmlFor="" className='block text-sm font-semibold mb-2'>Password</label>
                    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}  className='w-full p-2 border rounded' placeholder='Enter your password'/>
                </div>
                <button type='submit' className='w-full bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition'>{loading?"Loading...":"Sign Up"}</button>
                <p className='mt-6 text-center text-sm'>Already have an account?{" "}<Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className='text-blue-500' >Login</Link></p>
            </form>
        </div>
        <div className='hidden md:block w-1/2 bg-gray-800 '>
            <div className='h-full flex flex-col justify-center items-center'>
                <img src={register} alt="Register" className='h-[700px] w-full object-cover' />
            </div>
        </div>
    </div>
  )
}

export default Register