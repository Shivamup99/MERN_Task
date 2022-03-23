const Address = require("../model/address")
const mongoose = require('mongoose')
const User = require("../model/user")
//get address

exports.getAddress = async(req,res)=>{
    try {
        const address = await Address.find().select('-__v -_id')
        res.status(202).json(address)
    } catch (error) {
        res.json({message:error.message})
    }
}

//get address ID
exports.getAddressID = async (req,res)=>{
    const validID = mongoose.isValidObjectId({_id:req.params._id})
    if(!validID) return res.status(500).json({message:'system error'})
    try {
       let address = await Address.findById({_id:req.params._id}).populate({path:'user' , select:'-password'})
       res.status(200).json(address)
    } catch (error) {
        res.json({message:error.message})
    }

}

//post address
exports.postAddress =async(req,res)=>{
    // if(Object.keys(req.body).length!==5) return res.status(500).json({message:'system error'})
    let users = await User.findById(req.user)
    console.log(users)
    try {
        const address = new Address({
            post_code:req.body.post_code,
            state: req.body.state,
            distric: req.body.distric,
            house_location: req.body.house_location,
            country: req.body.country,
        })
        await address.save()
        users.address = address._id
        await users.save()
        res.status(201).json(address)
    } catch (error) {
        res.json(error)
    }
}

//put address

exports.putAddress =async(req,res)=>{
   const validID = mongoose.isValidObjectId({_id:req.params._id})
   if(!validID) return res.status(500).json({message:'system error'})
   try {
    const address = await Address.findByIdAndUpdate({_id:req.params._id},{
        post_code:req.body.post_code,
        state: req.body.state,
        distric: req.body.distric,
        house_location: req.body.house_location,
        country: req.body.country
       },{new:true})
    
       await address.save()
       res.status(202).json(address)
   } catch (error) {
       res.json({message:error.message})
   }
}

exports.deleteAddress =async(req,res)=>{
    const validID = mongoose.isValidObjectId({_id:req.params._id})
   if(!validID) return res.status(500).json({message:'system error'})
   try {
       const address = await Address.findByIdAndDelete({_id:req.params._id})
       if(address){
           res.status(200).json({message:'address deleted'})
       } else{
           res.status(400).json({message:'address not found'})
       }
   } catch (error) {
       res.json({message:error.message})
   }  
}