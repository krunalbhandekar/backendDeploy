const express=require("express");
const UserRoutes=express.Router();
const bcrypt=require("bcrypt")
const UserModel=require("../Models/UserModel")
const jwt = require("jsonwebtoken");


require('dotenv').config()

//register

UserRoutes.post("/register",async(req,res)=>{
    const {username,email,password,isAdmin}=req.body

    const oldUsername=await UserModel.findOne({username})
    const oldEmail=await UserModel.findOne({email})

    if(oldUsername){
        return res.send({message:"Registration failed",description:"This username already exits"})
    }
    else if(oldEmail){
        return res.send({message:"Registration failed",description:"This email already exits"})
    }
    else{

    await bcrypt.hash(password,6,async(err,hash)=>{
        if(err){
            return res.send({message:"Invalid Credential",description:"Please try again..."})
        }
        const newUser=new UserModel({username,email,password:hash,isAdmin})
        await newUser.save()
        return res.send({message:"User Register Successful",description:"Welcome",data:newUser})
    }) 
}
})

//login

UserRoutes.post("/login",async(req,res)=>{
    const {username,password}=req.body
    const user=await UserModel.findOne({username})
   
    if(!user){
        return res.send({message:"Login failed",description:"User not found"})
    }
    const hash=user.password

    await bcrypt.compare(password,hash,(err,result)=>{
        if(err){
            return res.send({message:"Login failed",description:"Please try again..."})
        }
        else if(result){
            const token=jwt.sign({email:user.email,isAdmin: user.isAdmin},"shhhhh")
            const { password, ...others } = user._doc;

            return res.send({message:"Login Succesfull",description:"Welcome",...others,token})
        }else{
             res.status(401).send({message:"Login failed",description:"Invalid credential"})
        }
    })
})



module.exports = UserRoutes;
