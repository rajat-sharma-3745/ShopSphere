const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middlewares/authMiddleware');


const router=express.Router();

router.post('/register', async (req,res)=>{
    const {name,email,password}=req.body;

    // registration logic
    try {
        // if user email already exists
        let user = await User.findOne({email});
        if(user) return res.status(400).json({message:"User already exists"});
        

        const newUser=new User({name,email,password});
        await newUser.save();

        // JWT Payload
        const payload = {user : {id : newUser._id, role:newUser.role }}

        // sign and return the token along with user data
        jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:'40h'}, (err,token)=>{
            if(err) throw err;

            // send the user and token in response
            res.status(201).json({
               user:{
                _id:newUser._id,
                name:newUser.name,
                email:newUser.email,
                role:newUser.role,
               },
               token,
            })

        })
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Server error")
    }
})

router.post('/login',async (req,res)=>{
    const { email,password } = req.body;

    try {
        let user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid credentials"});
        const isMatch = await user.matchPassword(password);  //custom instance methods which work on documents

        if(!isMatch) return res.status(400).json({message:"Invalid credentials"})
       
        // JWT Payload
        const payload = {user : {id : user._id, role:user.role }}

        // sign and return the token along with user data
        jwt.sign(payload,process.env.JWT_SECRET, {expiresIn:'40h'}, (err,token)=>{
            if(err) throw err;

            // send the user and token in response
            res.json({
               user:{
                _id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
               },
               token,
            })

        })   
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error")
        
    }
})

router.get('/profile', protect, async (req,res)=>{
   res.json(req.user)
})

module.exports=router;