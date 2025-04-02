const mongoose = require('mongoose');
const User = require('./User');

// Cart schema will contain multiple items, items will be an array of individual cart item(object)  so cart item will have its own schema ,so first we have defined the schema for  individual items in cart  , when user add a product to cart , a new item(document) based on cartItemSchema is created


const cartItemSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,  // References another document
      ref: "Product",  // Refers to the "Product" collection
      required: true,  // This field must be provided
    },
    name: String,   // Name of the product
    image: String,  // Image URL of the product
    price: String,  // Price of the product (consider making it a Number)
    size: String,   // Size of the product (e.g., "M", "L", "XL")
    color: String,  // Color of the product (e.g., "Red",
    quantity:{
        type:Number,
        default:1
    }
    
},{_id:false});   

const cartSchema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
   },
   guestId:{  //if the user is not logged in ,still he can add to cart 
    type:String,
   },
   products:[cartItemSchema],//array of items,which user had added to cart
   totalPrice:{
    type:Number,
    required:true,
    default:0
   },
},{timestamps:true})


module.exports=mongoose.model('Cart',cartSchema)