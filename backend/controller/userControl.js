const bcrypt = require('bcryptjs')
const User = require('../model/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {nodemailer} = require('../helper/index')
//Get user

exports.getUser = async(req,res)=>{
  try {
    const user = await User.find()
    .select('-password')
    res.json(user)
  } catch (error) {
     res.json({message:error.message}) 
  }
}

//Get user ID

exports.getUserID = async(req,res)=>{
    const validID = mongoose.isValidObjectId({_id:req.params._id})
    if(!validID) return res.status(500).json({message:'system error'})
    try {
        const user = await User.findById({_id:req.params._id}).populate(
            {path:"blog", select: "-_id -__v ",}
            ).select('-password').populate({path:'address'})
        res.json(user)
        
    } catch (error) {
        res.json({message:error.message})
    }
}



//Post user
exports.postUser = async(req,res)=>{
    // if(Object.keys(req.body).length!==6) return res.status(500).json({message:'system error'})
    const user =  await User.findOne({email:req.body.email})
    if(user) {
      res.status(400).json('User allready registerd')
    } else{
        try {
            let profile = req.file.path
            console.log(profile)
            const user = new User({
                name: req.body.name,
                email:req.body.email,
                password: req.body.password,
                mobile: req.body.mobile,
                profession:req.body.profession,
                profile:profile,
            })
            user.profile=profile
            let salt = await bcrypt.genSalt(15)
            user.password = await bcrypt.hash(user.password , salt)
            await user.save()
            res.status(201).json(user)
        } catch (error) {
           res.json({message:error.message}) 
        }
    }
}


exports.putUser =async(req,res)=>{
    const validID = mongoose.isValidObjectId({_id:req.params._id})
    if(!validID) return res.status(500).json({message:'system error'})
    try {
     const user = await User.findByIdAndUpdate({_id:req.params._id},{
        name: req.body.name,
        email:req.body.email,
        mobile: req.body.mobile,
        address:req.body.address,
        profession:req.body.profession
        },{new:true})
     
        await user.save()
        res.status(202).json(user)
    } catch (error) {
        res.json({message:error.message})
    }
 }

// User login
exports.userLogin = async(req,res)=>{
    if(Object.keys(req.body).length!==2) 
    return res.status(500).json({message:'system error'})
    const user = await User.findOne({email:req.body.email})
    if(!user){
        res.status(401).json('user not found')
    } else{
        try {
            const isMatch = await bcrypt.compare(req.body.password,user.password)
            if(!isMatch) return res.status(403).json('email/password incorrect')
            const token = await jwt.sign({_id:user._id},process.env.Key)
            res.header('Authorization').status(200).json({_id:user._id,token})
        }
         catch (error) {
            res.json({message:error.message})
        }
    }
}

exports.forgotPassword=async(req,res)=>{
    try {
        const {email} = req.body
        const user = await User.findOne({email:email})
        if(!user){
            return res.status(400).json({
                message:'Email is wrong'
            })
        }
        const token = await jwt.sign({_id:user._id},process.env.Key,{ expiresIn: 60 * 60 * 24 * 10 })
        await user.updateOne({resetPasswordLink : token})
    
        const templateEmail ={
            from:'shivam190445@gmail.com',
            to:email,
            subject:'Reset Password',
            html:`<p> click link </p> <p>${process.env.CLINT_URL}/resetpassword/${token}</p> `
        }
        nodemailer(templateEmail)
        return res.status(200).json({message:'check your email'})
        } catch (error) {
            res.status(400).json({message:error.message})
        } 
    }

exports.resetPasswordLink=async(req,res)=>{
    try {
        const {token,password} = req.body
        const user =  await User.findOne({resetPasswordLink:token})
        console.log(user)
        if(user){
            const hashPassword = await bcrypt.hash(password,15)
            user.password = hashPassword
            await user.save()
            return res.status(200).json({message:'password change'})
        }
    } catch (error) {
        res.status(422).json({message:error.message})
    }
}