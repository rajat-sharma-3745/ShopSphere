import React from 'react'
import { RiDeleteBin3Line } from 'react-icons/ri';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateCartItemQuantity } from '../../redux/slice/cartSlice';

function CartContent({cart,userId,guestId}) {
    // const cartProducts = [
    //     {
    //       productId: 1,
    //       name: "T-shirt",
    //       size: "M",
    //       color: "Red",
    //       quantity: 1,
    //       price: 15,
    //       image: "https://picsum.photos/200?random=1",
    //     },
    //     {
    //       productId: 2,  // Duplicate ID issue?
    //       name: "Jeans",
    //       size: "M",
    //       color: "Blue",
    //       quantity: 1,
    //       price: 25,
    //       image: "https://picsum.photos/200?random=2",
    //     }
    //   ];
    
    

    const dispatch = useDispatch();
    // Handle adding or subtracting to cart
    const handleAddToCart = (productId,delta,quantity,color,size) => {
         const newQuantity = quantity + delta;
         if(newQuantity>=1){
            dispatch(updateCartItemQuantity({
                productId,
                quantity:newQuantity,
                guestId,
                userId,
                size,color
            }))
         }
    }

    const handleRemoveFromCart =(productId,size,color)=>{
       dispatch(removeFromCart({productId,size,color,guestId,userId}))
    }
  return (
    <div>
        {
            cart.products.map((product,index)=>(
                <div key={index} className='flex items-start justify-between py-4'>
                    <div className='flex items-start'>
                        <img src={product.image} alt={product.name} className='w-20 h-24 object-cover mr-4 rounded' />
                        <div>
                            <h3>{product.name}</h3>
                            <p className='text-sm text-gray-500'>
                                size: {product.size} | color: {product.color}
                            </p>
                            <div className='flex items-center mt-2'>
                                <button onClick={()=>handleAddToCart(product.productId,-1,product.quantity,product.color,product.size)} className='border rounded px-2 py-1 text-xl font-medium cursor-pointer'>-</button>
                                <span className='mx-4'>{product.quantity}</span>
                                <button onClick={()=>handleAddToCart(product.productId,1,product.quantity,product.color,product.size)} className='border rounded px-2 py-1 text-xl font-medium cursor-pointer'>+</button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p>$ {product.price.toLocaleString()}</p>
                         {/* Delete */}
                        <button className='cursor-pointer' onClick={()=>handleRemoveFromCart(product.productId,product.size,product.color,guestId,userId)}>
                            <RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-600'/>
                        </button>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default CartContent