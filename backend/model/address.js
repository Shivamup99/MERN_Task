const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    post_code:{
        type:Number,
        required:true
    },
    state:{
        type: String,
        required:true
    },
    distric:{
        type: String,
        required: true
    },
    house_location:{
        type: String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model('Address',addressSchema)