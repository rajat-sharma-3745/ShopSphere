import React, { useEffect } from 'react'
import MyOrderPage from './MyOrderPage'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/slice/authSlice';
import { clearCart } from '../redux/slice/cartSlice';
import { toast } from 'sonner';
import ProfileCard from './ProfileCard';

function Profile() {

    const {user} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!user){
            navigate('/login');
        }
    },[user,navigate]);

    const handleLogout =() => {
        dispatch(logout());
        dispatch(clearCart());
        navigate('/login');
        toast.success(<b>Logged out successfully</b>,{duration:2000})
    } 
    if (!user) return null;
  return (
  
        <div className='min-h-screen container mx-auto p-5 md:p-6 '>
            <div className='flex flex-col items-center md:space-x-6 md:space-y-0 space-y-6'>
                {/* Left section */}
                {/* <div className='w-full md:w-1/3 lg:w-1/4 h-60 shadow-md rounded-lg p-6'>
                    <h1 className='text-2xl md:text-3xl font-bold mb-4'>{user?.name}</h1>
                    <p className='text-lg text-gray-600 mb-4'>{user?.email}</p>
                    <button onClick={handleLogout} className='w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600'>Logout</button>
                </div> */}
                <ProfileCard user={user} handleLogout={handleLogout}/>

                {/* Right section */}
                <div className='w-full md:w-2/3 lg:w-3/4'>
                    <MyOrderPage/>
                </div>
            </div>
        </div>
  
  )
}

export default Profile