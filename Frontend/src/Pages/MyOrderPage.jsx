import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUserOrders } from '../redux/slice/orderSlice';
import MyOrderPageShimmer from './MyOrderPageShimmer';

function MyOrderPage() {
    // const [orders,setOrders]=useState([]);
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const {orders,loading,error} = useSelector((state)=>state.orders);
 
    useEffect(()=>{
        dispatch(fetchUserOrders());
    },[dispatch])



    // useEffect(() => {
    //     // Simulate fetching orders
    //     setTimeout(() => {
    //       const mockOrders = [
    //         {
    //           _id: "12345",
    //           createdAt: new Date(),
    //           shippingAddress: { city: "New York", country: "USA" },
    //           orderItems: [
    //             {
    //               name: "Product 1",
    //               image: "https://picsum.photos/500/500?random=1",
    //             },
    //           ],
    //           totalPrice: 100,
    //           isPaid: true,
    //         },
    //         {
    //           _id: "57482",
    //           createdAt: new Date(),
    //           shippingAddress: { city: "London", country: "UK" },
    //           orderItems: [
    //             {
    //               name: "Product 2",
    //               image: "https://picsum.photos/500/500?random=2",
    //             },
    //           ],
    //           totalPrice: 100,
    //           isPaid: true,
    //         },
    //       ];

    //       setOrders(mockOrders);
    //     }, 1000);
    // }, []);

    function handleRowClick(orderId){
       navigate(`/order/${orderId}`)
    }

    if(loading){
        return <MyOrderPageShimmer/>
        // <p>Loading...</p>
    }
    if(error){
        <p>Error: {error}</p>
    }
      
  return (
    <div className='max-w-7xl mx-auto p-3 sm:p-6'>
        <h2 className='text-xl sm:text-2xl font-bold mb-6'>
            My Orders
        </h2>
        <div className='relative shadow-md sm:rounded-lg overflow-x-auto'>
            <table className='min-w-full text-left text-gray-500'>
                <thead className='bg-gray-100 text-xs uppercase text-gray-700 text-nowrap'>
                    <tr>
                        <th className='py-2 px-4 sm:py-3'>Image</th>
                        <th className='py-2 px-4 sm:py-3'>Order Id</th>
                        <th className='py-2 px-4 sm:py-3'>Created</th>
                        <th className='py-2 px-4 sm:py-3'>Shipping Address</th>
                        <th className='py-2 px-4 sm:py-3'>Items</th>
                        <th className='py-2 px-4 sm:py-3'>Price</th>
                        <th className='py-2 px-4 sm:py-3'>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length>0?(
                        orders.map((order)=>(
                            <tr onClick={()=>handleRowClick(order._id)} key={order._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                <td className='py-2 px-2 sm:px-4 sm:py-4'>
                                    <img src={order.orderItems[0].image} alt={order.orderItems[0].name} className='h-10 w-10 sm:h-12 sm:w-12 rounded-lg object-cover object-top' />
                                </td>
                                <td className='py-2 px-2 sm:py-4 sm:px-4 font-medium text-gray-900 whitespace-nowrap'>
                                    #{order._id}
                                </td>
                                <td className='py-2 px-2 sm:py-4 sm:px-4 text-nowrap'>
                                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                                    {new Date(order.createdAt).toLocaleTimeString()}
                                </td>
                                <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                    {order.shippingInfo?`${order.shippingInfo.city}, ${order.shippingInfo.country}`:'N/A'}
                                </td>
                                <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                    {order.orderItems.length}
                                </td>
                                <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                    {order.totalPrice}
                                </td>
                                <td className='py-2 px-2 sm:py-4 sm:px-4'>
                                   <span className={`${order.isPaid?'bg-green-100 text-green-700':'bg-red-100 text-red-700'} px-2 py-1 rounded-full text-xs sm:text-sm font-medium`}>
                                    {order.isPaid?'Paid':"Pending"}
                                   </span>
                                </td>
                            </tr>
                        ))
                    ):(
                        <tr>
                            <td colSpan={7} className='py-4 px-4 text-center text-gray-500'>
                                You have no orders
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div> 
    </div>
  )
}

export default MyOrderPage