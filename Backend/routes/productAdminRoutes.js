const express = require('express');
const Product = require('../models/Product');
const {protect, checkAdmin} = require('../middlewares/authMiddleware');


const router = express.Router();

// Get: get all products
router.get('/', protect, checkAdmin, async(req,res)=>{
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})


module.exports=router;