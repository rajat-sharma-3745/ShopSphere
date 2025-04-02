const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const {protect} = require('../middlewares/authMiddleware')

const router = express.Router();


async function getCart(userId,guestId){
    if(userId){ //if user is logged in ,get the cart by user id 
       return await Cart.findOne({user:userId})
    }
    else if(guestId){ //if guest user(not logged in) get the cart by guest id
        return await Cart.findOne({guestId})
    }
    return null;//cart does not exist
}

// Post: Add a product to the cart (both for guest or logged in user)
router.post('/', async (req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body;
   
    
    try {
        const product = await Product.findById(productId);
        if(!product) return res.status(404).json({message:"Product not found"});

        // check if cart exists(means contain any item or not), we will check either by userId or guestId
        let cart = await getCart(userId,guestId);
        if(cart){   //if cart exists
            //check the product(we got from the req) exist or not , we are checking for the size and color ,to make sure that the cart item exist with a unique combination of productId ,color and size(no duplication)
            const productIndex = cart.products.findIndex((p)=>p.productId.toString()===productId && p.color===color && p.size===size)
            
            if(productIndex>-1){  // product already exists , update the quantity
                cart.products[productIndex].quantity += Number(quantity)
            }else{  //the product is not present in the cart , so add it
                cart.products.push({
                    productId,
                    name:product.name,
                    image:product.images[0].url,
                    price:product.price,
                    size,
                    color,
                    quantity,
                })
            }

            // Recalculate total price
            cart.totalPrice = cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
            await cart.save();
            return res.status(201).json(cart);

        }
        else{  //if cart does not exist, create a new cart
           const newCart = await Cart.create({
             user:userId ? userId : undefined,
             guestId:guestId ? guestId : 'guest_'+new Date().getTime(),
             products:[{
                productId,
                name:product.name,
                image:product.images[0].url,
                price:product.price,
                size,
                color,
                quantity,
             }],
             totalPrice:product.price*quantity
             
           })
           return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
        
    }
})

// Put: to update the quantity of cart items
router.put('/',async(req,res)=>{
    const {productId,quantity,size,color,guestId,userId}=req.body;
    try {
        let cart = await getCart(userId,guestId);  //get the cart either by userId or guestId
        if(!cart) return res.status(404).json({message:"Cart not found"});
        // Check product if exist to update
        const productIndex = cart.products.findIndex((p)=>p.productId.toString()===productId && p.color===color && p.size===size);
        if(productIndex>-1){ // if exist update 
            if(quantity>0){
                cart.products[productIndex].quantity = quantity
            }else{  //remove if quantity is 0
                cart.products.splice(productIndex,1);
            }
            cart.totalPrice = cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
            await cart.save();
            return res.status(200).json(cart);
        }
        else{
            return res.status(404).json({message:"Product not found in cart"})
        }


    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
})

// Delete: Remove product from the cart
router.delete('/',async(req,res)=>{
    const {productId,size,color,guestId,userId}=req.body;
    try {
        let cart = await getCart(userId,guestId);  //get the cart either by userId or guestId
        if(!cart) return res.status(404).json({message:"Cart not found"});

        const productIndex = cart.products.findIndex((p)=>p.productId.toString()===productId && p.color===color && p.size===size);

        if(productIndex>-1){
            cart.products.splice(productIndex,1);
            cart.totalPrice = cart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
            await cart.save();
            return res.status(200).json(cart);
        }
        else{
            return res.status(404).json({message:"Product not found in cart"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
})

// Get: get the cart(for logged in or guest user)
router.get('/',async (req,res)=>{
   const {userId,guestId} = req.query;
   try {
    const cart = await getCart(userId,guestId);
    if(cart) {
        res.json(cart);
    }
    else{
        res.status(404).json({message:"Cart not found"});
    }
   
   } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
   }
})


// Post: merge guest cart into user cart on login(protected route)
router.post('/merge', protect, async(req,res)=>{
    const {guestId} = req.body;
    try {
        const guestCart = await Cart.findOne({guestId});
        const userCart = await Cart.findOne({user:req.user._id})

        if(guestCart){
            if(guestCart.products.length===0){
                return res.status(404).json({message:"Guest cart is empty"})
            }
            // Check if user cart exist , if yes ,add the product or update the quantity(if already exists)
            if(userCart){
                // Merge guest cart into user cart
                guestCart.products.forEach((guestItem)=>{
                    const productIndex = userCart.products.findIndex((item)=>item.productId.toString()===guestItem.productId.toString() && item.size===guestItem.size && item.color ===guestItem.color )

                    if(productIndex>-1){
                        // if the guest item exists in the user cart, update the quantity
                        userCart.products[productIndex].quantity += guestItem.quantity;
                    }
                    else{
                        // otherwise, add the guest item to the cart
                        userCart.products.push(guestItem)
                    }
                });
                userCart.totalPrice = userCart.products.reduce((acc,item)=>acc+item.price*item.quantity,0);
                await userCart.save();

                // Also remove the guest cart after merging
                try {
                    await Cart.findOneAndDelete({guestId})
                } catch (error) {
                    console.error("Error deleting guest cart ",error);
                }

                return res.status(200).json(userCart);
            }else{
              //If the user has no existing cart, assign the guest cart to user
              //the cart are retrieved by the guest or user id 
              guestCart.user = req.user._id; // Assign the cart to the logged-in user by simply assigning the user id to user field (in cartSchema) so now that cart will belong to the user with that userId
              guestCart.guestId = null; // Remove guestId since it's now a user cart
              await guestCart.save(); // Save the updated cart
  
              return res.status(200).json(guestCart);  
            }
        } else{  // guest cart does not exist
            if(userCart){
                // guest cart has already been merged, return user cart
                return res.status(200).json(userCart)
            }
            return res.status(404).json({message:"Guest cart is empty"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
})




module.exports=router