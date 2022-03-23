const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
    blog_creator:{
        type: String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    creted:{
        type:Date,
        default:Date.now()
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    }

})

module.exports = mongoose.model('Blog',blogSchema)