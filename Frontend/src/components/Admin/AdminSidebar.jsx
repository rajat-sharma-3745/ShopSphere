import React from 'react'
import { FaBoxOpen, FaClipboardList, FaSignOutAlt, FaStore, FaUser } from 'react-icons/fa'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logout } from '../../redux/slice/authSlice';
import { clearCart } from '../../redux/slice/cartSlice';
import { toast } from 'sonner';

function AdminSidebar({onClick}) {
  const navigate=useNavigate();
  const dispatch = useDispatch();
  function handleLogout(){
     navigate('/');
     dispatch(logout())
     dispatch(clearCart());
     toast.success('Logged out successfully',{duration:1000});
  }
  return (
    <div className='p-6'>
      <div className='mb-6'>
        <Link to='/admin' className='text-2xl font-medium'>Rabbit</Link>
      </div>
      <h2 className='text-xl text-center font-medium mb-6'>Admin Dashboard</h2>
      <nav className='flex flex-col space-y-2 '>
          <NavLink onClick={onClick} to='/admin/users' className={({isActive})=>isActive?'bg-gray-700 text-white  py-3 px-4 rounded flex items-center space-x-2':'text-gray-300 hover:bg-gray-700 hover:text-white  py-3 px-4 rounded flex items-center space-x-2'}>
              <FaUser/>
              <span>Users</span>
          </NavLink>
          <NavLink onClick={onClick} to='/admin/products' className={({isActive})=>isActive?'bg-gray-700 text-white  py-3 px-4 rounded flex items-center space-x-2':'text-gray-300 hover:bg-gray-700 hover:text-white  py-3 px-4 rounded flex items-center space-x-2'}>
              <FaBoxOpen/>
              <span>Products</span>
          </NavLink>
          <NavLink onClick={onClick} to='/admin/orders' className={({isActive})=>isActive?'bg-gray-700 text-white  py-3 px-4 rounded flex items-center space-x-2':'text-gray-300 hover:bg-gray-700 hover:text-white  py-3 px-4 rounded flex items-center space-x-2'}>
              <FaClipboardList/>
              <span>Orders</span>
          </NavLink>
          <NavLink onClick={onClick} to='/' className={({isActive})=>isActive?'bg-gray-700 text-white  py-3 px-4 rounded flex items-center space-x-2':'text-gray-300 hover:bg-gray-700 hover:text-white  py-3 px-4 rounded flex items-center space-x-2'}>
              <FaStore/>
              <span>Shop</span>
          </NavLink>
      </nav>

      <div className='mt-6'>

        <button onClick={handleLogout} className='w-full bg-red-500 text-white hover:bg-red-600 py-2 px-4 rounded flex items-center justify-center space-x-2 cursor-pointer'>

          <FaSignOutAlt/>
          <span>Logout</span>
        </button>
      </div>
    </div>
  )
}

export default AdminSidebar