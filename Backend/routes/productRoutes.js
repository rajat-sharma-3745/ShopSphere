const express = require('express');
const Product = require('../models/Product');
const { protect, checkAdmin } = require('../middlewares/authMiddleware');

const router = express.Router();



// Put : update the product by id
router.put('/:id', protect, checkAdmin, async (req, res) => {
    try {
        const { name, description, price, discountPrice, countInStock, category, brand, sizes, colors, collections, material, gender, images, isFeatured, isPublished, tags, dimensions, weight, sku } = req.body;
        const product = await Product.findById(req.params.id);
        if (product) {
            // update product fields , always provide a fallback value 
            product.name = name || product.name;
            product.description = description || product.description;
            product.price = price || product.price;
            product.discountPrice = discountPrice || product.discountPrice;
            product.countInStock = countInStock || product.countInStock;
            product.category = category || product.category;
            product.brand = brand || product.brand;
            product.sizes = sizes || product.sizes;
            product.colors = colors || product.colors;
            product.collections = collections || product.collections;
            product.material = material || product.material;
            product.gender = gender || product.gender;
            product.images = images || product.images;
            // boolean values 
            product.isFeatured =
                isFeatured !== undefined ? isFeatured : product.isFeatured;
            product.isPublished =
                isPublished !== undefined ? isPublished : product.isPublished;
            product.tags = tags || product.tags;
            product.dimensions = dimensions || product.dimensions;
            product.weight = weight || product.weight;
            product.sku = sku || product.sku;

            const updatedProduct = await product.save();
            res.json(updatedProduct)
        }
        else {
            res.status(404).json({ message: "Product not found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})

// Delete :delete product by id
router.delete('/:id', protect, checkAdmin, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.deleteOne();
            res.json({ message: "Product removed" })
        }
        else {
            res.status(401).json({ message: "Product not found" })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})

// Get all products with optional query filters
router.get('/', async (req, res) => {
    try {
        const { collection, size, color, gender, minPrice, maxPrice, sortBy, search, category, material, brand, limit
        } = req.query;

        let query = {};
        // Filter logic
        if (collection && collection.toLocaleLowerCase() !== "all") {
            query.collections = collection;
        }

        if (category && category.toLocaleLowerCase() !== "all") {
            query.category = category;
        }

        //material will be comma seperated string ,split will convert it to array and $in operator is a MongoDB query operator that filters(select) documents where the material field matches any of the values in the array.
        if (material) {  
        query.material = { $in: material.split(",") };
        }
        if (brand) {  
        query.brand = { $in: brand.split(",") };
        }
        if (size) {  
        query.sizes = { $in: size.split(",") };
        }
        if (color) {  
        query.colors = { $in:[color] };
        }
        if (gender) {  
        query.gender = gender;
        }
        if(minPrice || maxPrice){
            query.price = {}
            if(minPrice) query.price.$gte =Number(minPrice) //Resulting query = {price:{$gte:30}}
            if(maxPrice) query.price.$lte =Number(maxPrice)
        }
        if (search) {
            // $or is logical operator in which we can specify multiple conditions and it will match one or more of them , It returns results that match any of the conditions inside the array  this query will return those documents where either the name or desc matches the search term
            query.$or = [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } },
            ];
        }

        // sort logic
        let sort={}
        if(sortBy){
            switch(sortBy){
                case "priceAsc":
                    sort={price:1}; 
                    break;
                case "priceDesc":
                    sort={price:-1}; 
                    break;
                case "popularity":
                    sort={rating:-1}; 
                    break;
                default :break;    
            }
        }
        // fetch products and apply sorting and limit
        let products= await Product.find(query).sort(sort).limit(Number(limit) || 0) //query filter out documents, sort : orders them in specific order, limit: restricts number of documents returned.
        res.json(products);
        

    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }

})

// Get: Best seller , retrieve the product with highest rating
router.get('/best-seller',async(req,res)=>{
    try {
        const bestSeller = await Product.findOne().sort({rating:-1});
        if(bestSeller){
            res.json(bestSeller);
        }
        else{
            res.status(404).json({message:"No best seller found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})

// Get: new-arrivals ,retrieve few latest products - creation date
router.get('/new-arrivals',async (req,res)=>{
    try {
        const newArrivals = await Product.find().sort({createdAt:-1}).limit(8)
        if(newArrivals){
            res.json(newArrivals);
        }
    } catch (error) {
       console.error(error);
        res.status(500).send("Server error") 
    }
}) 


// Get: details about single product by id
router.get('/:id',async(req,res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(product){
            res.json(product);
        }
        else{
            res.status(404).json({message:"Product not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})

// Get: Retrieve similar products based on gender and category
router.get('/similar/:id' ,async(req,res)=>{
    const {id} = req.params;
    try {
        const product = await Product.findById(id);
        if(!product){
           return res.status(404).json({message:"Product not found"});
        }
        const similarProducts = await Product.find({
            _id:{$ne:id},  //$ne is not equal to operator , excluding the current product(by id)
            gender:product.gender,
            category:product.category
        }).limit(4);
        res.json(similarProducts)
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
    }
})





module.exports = router;