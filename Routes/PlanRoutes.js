const express=require("express")
const PlanRoutes=express.Router()
const PlanModel=require("../Models/PlanModel")
const {verifyTokenAndAdmin}=require("../Middleware/VerifyAdmin")

//create

PlanRoutes.post("/post",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const {title,description,price}=req.body
        const newPlan=new PlanModel({title,description,price})
        newPlan.save()
        return res.send({message:"Plan has been added successfully",data:newPlan})
    }
    catch(err){
    return res.send(err);
    }
})

//get

PlanRoutes.get("/",async(req,res)=>{
    // const allPlanData=await PlanModel.find()
    // const count=await PlanModel.countDocuments()
     return res.send({data:"allPlanData",total:"count"});
})

//update

PlanRoutes.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        const updatePlanData=await PlanModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
        return res.send({message:"Plan Data Updated Succesfully",data:updatePlanData});
    }
    catch(err){
    return res.send(err);
    }
})

//delete

PlanRoutes.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
        await PlanModel.findByIdAndDelete(req.params.id)
        return res.send({message:"Plan Data Deleted Succesfully"});
    }
    catch(err){
    return res.send(err);
    }
})





module.exports=PlanRoutes
