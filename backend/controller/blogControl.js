const Blogs = require('../model/blog')
const mongoose = require('mongoose')
const User = require('../model/user')
const auth = require('../middleware/auth')
const user = require('../model/user')

exports.getBlog = async(req,res,auth)=>{
    
    try {
        const blog = await Blogs.find().populate({path:"user",select:'-password'})
        res.status(200).json(blog)
    } catch (error) {
        res.json({message:error.message})
    }
}


exports.getBlogID = async(req,res)=>{
    const validID = mongoose.isValidObjectId({_id:req.params._id})
    if(!validID) return res.status(500).json({message:'system error'})
    try {
        const blog = await Blogs.findById({_id:req.params._id}).populate({path:"user",select:'-password'})
        res.status(200).json(blog)
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.postBlog =async (req,res)=>{
    let id = req.user._id
    console.log(id)
    let users = await User.findById(req.user)
    console.log(users)
        try {
            let image = req.file.path
            console.log(image)
            const blog = new Blogs({
                title:req.body.title,
                blog_creator: req.body.blog_creator,
                desc: req.body.desc,
                user:id
            })
            blog.image=image
            await blog.save()
            users.blog.push(blog._id)
            await users.save()
            res.status(201).json(blog)
            
        } catch (error) {
            res.json({message:error.message})
        }
}



exports.putBlog =async(req,res)=>{
    const validID = mongoose.isValidObjectId({_id:req.params._id})
    if(!validID) return res.status(500).json({message:'system error'})
    try {
        let image = req.file.path
        const blog = await Blogs.findByIdAndUpdate({_id:req.params._id},{
            title:req.body.title,
            blog_creator: req.body.blog_creator,
            desc: req.body.desc,
            image:image
        },{new:true})
        await blog.save()
        res.status(202).json(blog)
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.deleteBlog =async(req,res)=>{
    const validID = mongoose.isValidObjectId({_id:req.params._id})
    if(!validID) return res.status(500).json({message:'system error'})
    try {
        const blog = await Blogs.findByIdAndDelete({_id:req.params._id})
        if(blog){
            res.status(200).json({message:"blog deleted"})
        } else{
            res.status(400).json({message:"blog not found"})
        }
    } catch (error) {
        res.json({message:error.message})
    }
}

