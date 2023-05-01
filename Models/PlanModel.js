const mongoose=require("mongoose")

const PlanSchema= new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true}
})

const PlanModel=mongoose.model("plan",PlanSchema)

module.exports=PlanModel