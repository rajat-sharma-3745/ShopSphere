const express = require('express');
const User = require('../models/User');
const {protect, checkAdmin} = require('../middlewares/authMiddleware');

const router = express.Router();

// Get: retrieve all users
router.get('/',protect, checkAdmin, async(req,res)=>{

    try {
        const users = await User.find({}); 
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

// Post: add a new user
router.post('/',protect, checkAdmin, async(req,res)=>{
    const {name,email,password,role} = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        user = new User({
            name,
            email,
            password,
            role:role || "customer"
        })
        await user.save();
        res.status(201).json({message:"User created successfully", user});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

// Put: update user
router.put('/:id',protect, checkAdmin, async(req,res)=>{
    const {name,email,role} = req.body;
    try {
        const user = await User.findById(req.params.id);
        if(user){
            user.name = name || user.name;
            user.email = email || user.email;
            user.role = role || user.role;
        }
        const updatedUser = await user.save();
        res.json({message:"User updated successfully",user:updatedUser})
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

// Delete: delete a user
router.delete('/:id',protect, checkAdmin, async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(user){
            await user.deleteOne();
            res.json({message:"User deleted successfully"})
        }else{
             res.status(404).json({message:"User not found"})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

module.exports=router;