const mongoose=require("mongoose")

const BuyPlanSchema= new mongoose.Schema({
    userid:{type:String, required:true},
    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    planid:{type:String, required:true},
})

const BuyPlanModel=mongoose.model("buyplan",BuyPlanSchema)

module.exports=BuyPlanModel