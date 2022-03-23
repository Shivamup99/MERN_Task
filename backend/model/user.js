const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    profile:{
        type:String,
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    mobile:{
        type:Number,
        required:true,
        unique: true
    },
    profession:{
        type:String,
        required:true
      },
    address:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Address",
    },
    blog:[{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Blog",
    }],
    resetPasswordLink:{
        type:String,
        default:''
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)