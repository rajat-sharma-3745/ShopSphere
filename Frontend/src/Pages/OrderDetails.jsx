import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import { fetchOrderDetails } from '../redux/slice/orderSlice';
import OrderDetailsShimmer from './OrderDetailsShimmer';

function OrderDetails() {
  const {id} =useParams();
  const dispatch = useDispatch();
  const {orderDetails,loading,error} = useSelector((state)=>state.orders)
   useEffect(()=>{
        dispatch(fetchOrderDetails(id));
    },[dispatch,id]);


  // to hold order details
//   const [orderDetails,setOrderDetails] = useState(null); 

//   useEffect(() => {
//     const mockOrderDetails = {
//       _id: id,
//       createdAt: new Date(),
//       isPaid: true,
//       isDelivered: false,
//       paymentMethod: "PayPal",
//       shippingMethod: "Standard",
//       shippingAddress: { city: "New York", country: "USA" },
//       orderItems: [
//         {
//           productId: "1",
//           name: "Jacket",
//           price: 120,
//           quantity: 1,
//           image: "https://picsum.photos/150?random=1",
//         },
//         {
//           productId: "2",
//           name: "Jeans",
//           price: 120,
//           quantity: 2,
//           image: "https://picsum.photos/150?random=2",
//         },
//       ],
//     };
//     setOrderDetails(mockOrderDetails);
//   },[id]);
  

if(loading){
    return <OrderDetailsShimmer/>
}
if(error){
    <p>Error: {error}</p>
}


return (
    <div className='max-w-7xl mx-auto p-4 sm:p-6 '>
        <h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
        {!orderDetails?(
            <p>No orders details found</p>
        ):(
            <div className='rounded-lg border border-gray-300 shadow-md p-4 sm:p-6'>
                {/* Order Info */}
                <div className='flex flex-col justify-between md:flex-row mb-8'>
                    <div>
                        <h3 className='font-semibold text-lg md:text-xl'>Order ID: #{orderDetails._id}</h3>
                        <p className='text-gray-600'>{new Date(orderDetails.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className='flex sm:flex-col flex-row items-start sm:items-end mt-4 sm:mt-0'>
                        <span className={`${orderDetails.isPaid?"bg-green-100 text-green-700":'bg-red-100 text-red-700'} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                             {orderDetails.isPaid?'Approved':'Pending'}
                        </span>
                        <span className={`${orderDetails.status==="Delivered"?"bg-green-100 text-green-700":'bg-yellow-100 text-yellow-700'} px-3 py-1 rounded-full text-sm font-medium mb-2`}>
                             {orderDetails.status==="Processing"||orderDetails.status==="Shipped"?'Pending Delivery':orderDetails.status==="Cancelled"?"Cancelled":"Delivered"}
                        </span>
                    </div> 
                </div>
                {/* Customer,Payment and Shipping Info */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Payment Info</h4>
                        <p>Payment Method: {orderDetails.paymentMethod}</p>
                        <p>Status: {orderDetails.isPaid?'Paid':"Unpaid"}</p>
                    </div>
                    <div>
                        <h4 className='text-lg font-semibold mb-2'>Shipping Info</h4>
                        <p>Shipping Method: {orderDetails.shippingMethod}</p>
                        <p>Address:{" "}{`${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.country}`}</p>
                    </div>
                </div>
                {/* Product list */}
                <div className='overflow-x-auto '>
                    <h4 className='text-lg font-semibold mb-4'>Products</h4>
                    <table className='min-w-full text-gray-600 mb-4'>
                        <thead className='bg-gray-100'>
                            <tr>
                            <th className='py-2 px-4'>Image</th>
                                <th className='py-2 px-4'>Name</th>
                                <th className='py-2 px-4 text-nowrap'>Unit Price</th>
                                <th className='py-2 px-4'>Quantity</th>
                                <th className='py-2 px-4'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderDetails.orderItems.map((item)=>(
                                <tr key={`${item.productId}-${item.size}-${item.color}`} className='border-b space-x-2 text-center'>
                                    <td className='py-2 px-4 flex justify-center'>
                                        <img src={item.image} alt={item.name} className='w-12 h-12 object-cover rounded-lg ' />
                                    </td>
                                      <td>  <Link to={`/product/${item.productId}`} className='text-orange-500 hover:underline text-nowrap mr-4'>{item.name}</Link></td>
                                    <td className="py-2 px-4 ">${item.price}</td>
                                    <td className="py-2 px-4 ">{item.quantity}</td>
                                    <td className="py-2 px-4 ">${item.price*item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Back to orders Link */}
                <Link to='/my-orders' className='text-blue-500 hover:underline'>Back to My Orders</Link>
            </div>
        )}
    </div>
  )
}

export default OrderDetails