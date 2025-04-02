const mongoose =  require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const products = require('./data/products');

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGO_URI);

// function to seed data
const seedData=async()=>{
    try {
        // clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        await Cart.deleteMany();

        // create a default admin user
        const createdUser = await User.create({
            name:"Admin user",
            email:"admin@example.com",
            password:"admin1",
            role:'admin'
        })

        // Assign default user id to each product
        const userId=createdUser._id;
        const sampleProducts = products.map((product)=>{
           return {...product,user:userId}
        })

        // Insert products in to database
        await Product.insertMany(sampleProducts);
        console.log("Product data seeded successfully");
        process.exit();
    } catch (error) {
        console.log("Error seeding data ",error);
        process.exit(1)
    }
}

seedData();