const express = require('express');
const Order = require('../models/Order');
const {protect, checkAdmin} = require('../middlewares/authMiddleware');


const router = express.Router();

// Get: get all orders
router.get('/', protect, checkAdmin, async(req,res)=>{
    try {
        const orders = await Order.find({}).populate('user',"name email");
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

// Put: update order status
router.put('/:id', protect, checkAdmin, async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id).populate('user',"name");;
        if(order){
            order.status = req.body.status || order.status;
            order.isDelivered = req.body.status === "Delivered" ? true : order.isDelivered;
            order.deliveredAt = req.body.status === "Delivered" ? Date.now() : order.deliveredAt;
            const updatedOrder = await order.save();
            res.json(updatedOrder)
        }else{
            res.status(404).json({message:"Order not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

// Delete: remove order
router.delete('/:id', protect, checkAdmin, async(req,res)=>{
    try {
        const order = await Order.findById(req.params.id);
        if(order){
            await order.deleteOne();
            res.json({message:"Order removed"});
        }else{
            res.status(404).json({message:"Order not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})


module.exports=router;