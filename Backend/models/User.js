const mongoose=require('mongoose');
const bcrypt = require('bcryptjs')



const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"]
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:'customer'
    }
},
{
    timestamps:true
});


// Password Hash Middleware
userSchema.pre('save',async function (next) {
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10);
    next();
})

// Custom method to compare passwords : match user entered password to stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports= mongoose.model('User',userSchema);