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

// Post : create product(only admin)
router.post('/', protect, checkAdmin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku } = req.body;
        const product = new Product({ name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku, user: req.user._id });
        const createdProduct = await product.save();
        res.status(201).json({ createdProduct })
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")

    }
})


module.exports=router;