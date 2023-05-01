const express=require("express")
const BuyPlanRoutes=express.Router()
const BuyPlanModel=require("../Models/BuyPlanModel")


//buy plan

BuyPlanRoutes.post("/post",async(req,res)=>{
    const {userid,title,description,price,planid}=req.body 
    const alreadyBuy=await BuyPlanModel.findOne({userid,planid})
    if(!alreadyBuy){
            const newBuyPlan=new BuyPlanModel({userid,title,description,price,planid})
            newBuyPlan.save()
            return res.send({message:"Plan has been purchased successfully",data:newBuyPlan})
    }else{
        return res.send({message:"You have already purchased this plan"})
    }
})

//delete buy plan

BuyPlanRoutes.delete("/:id",async(req,res)=>{
    try{
        await BuyPlanModel.findByIdAndDelete({_id:req.params.id})
        return res.send({message:"Your Current Plan Deleted Succesfully"});
    }
    catch(err){
    return res.send(err);
    }
})

//get buy plan

BuyPlanRoutes.get("/:id",async(req,res)=>{
    const BuyPlanData=await BuyPlanModel.find({userid:req.params.id})
     return res.send({message:"Your Current Plan List",data:BuyPlanData});
})

module.exports=BuyPlanRoutes