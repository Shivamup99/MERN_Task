const Category = require("../model/category")
const mongoose = require("mongoose")

exports.getCategory = async(req,res)=>{
    try {
        const category = await Category.find()
        res.status(200).json(category)
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.getCategoryID = async(req,res)=>{
    const validID = mongoose.isValidObjectId({_id:req.params._id})
    if(!validID) return res.status(500).json({message:'system error'})
    try {
        const category = await Category.findById({_id:req.params._id})
        res.status(200).json(category)
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.postCategory = async(req,res)=>{
    try {
        const category = new Category({
            cat_name:req.body.cat_name
        })
        await category.save()
        res.status(201).json(category)
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.putCategory =async(req,res)=>{
    const validID = mongoose.isValidObjectId({_id:req.params._id})
    if(!validID) return res.status(500).json({message:'system error'})
    try {
        const category = await Category.findByIdAndUpdate({_id:req.params._id},{
            cat_name:req.body.cat_name
        },{new:true}) 
        await category.save()
        res.status(202).json(category)
    } catch (error) {
        res.json({message:error.message})
    }
}

exports.deleteCategory =async (req,res)=>{
    const validID = mongoose.isValidObjectId({_id:req.params._id})
    if(!validID) return res.status(500).json({message:'system error'})
    try {
        const category = await Category.findByIdAndDelete()
        if(category){
            res.status(200).json({message:'category deleted'})
        } else{
            res.status(400).json({message:'category not found'})
        }
    } catch (error) {
        res.json({message:error.message})
    }
}