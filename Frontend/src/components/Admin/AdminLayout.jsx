import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa';
import AdminSidebar from './AdminSidebar';
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  const [isSidebarOpen,setIsSidebarOpen]=useState(false);
  function toggleSidebar(){
    setIsSidebarOpen(!isSidebarOpen);
  }  
  return (
    <div className='min-h-screen flex flex-col md:flex-row relative'>
        {/* Mobile Navigation button */}
        <div className='flex md:hidden p-4 bg-gray-900 text-white z-20 '>
            <button onClick={toggleSidebar}>
                <FaBars size={24}/>
            </button>
            <h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
        </div>
        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
            <div className='fixed inset-0 z-10 bg-black/50 lg:hidden' onClick={toggleSidebar}></div>
        )}

        {/* Sidebar */}
        <div className={`bg-gray-900 w-64 min-h-screen text-white absolute md:relative transform transition-transform duration-300 ${isSidebarOpen?'translate-x-0':'-translate-x-full'} md:static md:translate-x-0 md:block z-20`}>
            <AdminSidebar onClick={toggleSidebar}/>
        </div>

        {/* Main Content */}
        <div className='grow p-5 overflow-auto'>
          <Outlet/>
        </div>

    </div>
  )
}

export default AdminLayout