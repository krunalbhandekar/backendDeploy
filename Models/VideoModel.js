const mongoose=require("mongoose")

const VideoSchema= new mongoose.Schema({
    description:{type:String, required:true},
    video:{type:String, required:true}
})

const VideoModel=mongoose.model("video",VideoSchema)

module.exports=VideoModel