const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware for protected route 

const protect = async (req,res,next)=>{
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1];  //or we can replace the Bearer with empty string
            
            const decoded = jwt.verify(token,process.env.JWT_SECRET);


            req.user = await User.findById(decoded.user.id).select('-password')  //select method to specify which fields should be included or excluded from the document 

            
            next();
            
        } catch (error) {
            console.error("Token verification failed ",error);
            res.status(401).json({message:"Not authorized, token failed"})
            
        }
    }
    else{
        res.status(401).json({message:"Not authorized, no token provided"});
    }
}

// Middleware to check user is admin
const checkAdmin = (req,res,next)=>{
    if(req.user && req.user.role === "admin"){
        next();
    }
    else{
        res.status(401).json({message:"Not authorized as an admin"})
    }
}



module.exports={protect,checkAdmin};