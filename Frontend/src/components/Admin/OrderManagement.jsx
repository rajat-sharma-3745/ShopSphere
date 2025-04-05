import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slice/adminOrderSlice";
import { useNavigate } from "react-router-dom";
import OrderManagementShimmer from "./OrderManagementShimmer";
import OrderAndProductManagementShimmer from "./OrderManagementShimmer";

function OrderManagement() {

  // const orders = [
  //   {
  //     _id: 12312321,
  //     user: {
  //       name: "John Doe",
  //     },
  //     totalPrice: 110,
  //     status: "Processing",
  //   },
  // ];
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {user} = useSelector((state)=>state.auth);
  const {orders,loading,error} = useSelector((state)=>state.adminOrders);
  function handleRowClick(orderId){
    navigate(`/admin/order/${orderId}`)
 }
 
  useEffect(()=>{
      if(!user || user.role !== "admin"){
          navigate('/');
      }
      else{
        dispatch(fetchAllOrders());
      }
  },[user,navigate,dispatch]);

  
  function handleStatusChange(orderId,status){
     dispatch(updateOrderStatus({id:orderId,status}));
  }
  if (loading) return <OrderAndProductManagementShimmer name="Order"/>;
  if (error) return <p>Error: {error}</p>;


  return <div className="max-w-7xl mx-auto p-2">
    <h2 className="text-2xl font-bold mb-6 ">Order Management</h2>
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className='min-w-full text-left text-gray-500'>
            <thead className='bg-gray-100 text-xs uppercase text-gray-700 '>
                <tr>
                    <th className='px-4 py-3'>Order ID</th>
                    <th className='px-4 py-3'>Customer</th>
                    <th className='px-4 py-3'>Total Price</th>
                    <th className='px-4 py-3'>Status</th>
                    <th className='px-4 py-3'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {orders.length>0?(
                    orders.map((order)=>(
                        <tr onClick={()=>handleRowClick(order._id)} key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                            <td className="px-4 py-4 font-medium whitespace-nowrap text-gray-900">#{order._id}</td>
                            <td className="p-4 text-nowrap">{order.user.name} </td>
                            <td className="p-4">${order.totalPrice.toFixed(2)} </td>
                            <td className="p-4">
                                <select name="" id="" value={order.status} onChange={(e)=>handleStatusChange(order._id,e.target.value)} className="bg-gray-50 border-gray-300 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5">
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                </select>
                            </td>
                            <td className="p-4 text-nowrap">
                                <button onClick={()=>handleStatusChange(order._id,"Delivered")} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer">Mark as Delivered</button>
                            </td>
                        </tr>
                    ))
                ):(
                      <tr>
                        <td colSpan={5} className='p-4 text-center text-gray-500'>No orders found!</td>
                      </tr>
                )}
            </tbody>
        </table>
    </div>
  </div>;
}

export default OrderManagement;
