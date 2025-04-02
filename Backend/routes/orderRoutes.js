const express = require('express');
const Order = require('../models/Order');
const {protect} = require('../middlewares/authMiddleware');
const { route } = require('./checkoutRoutes');
const router = express.Router();

// Get: get the orders of users
router.get('/my-orders',protect, async (req,res)=>{
    try {
        const orders = await Order.find({user:req.user._id}).sort({createdAt:-1});//sort by most recent orders
        res.json(orders)
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"})
    }
})

// Get: get specific order details by id
router.get('/:id',protect, async (req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate(
            "user",
            "name email"
          );  //populate method is used to replace the refrenced objectId with the actual document from refrenced collection ,"user" refers to the field in order schema that stores a refrence to the User document , "name email": Specifies that only the name and email fields from the User document should be returned.
        
        if(!order){
            return res.status(404).json({message:"Order not found"})
        }
        res.json(order);  
          
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"})
    }
})

module.exports=router;