const express=require("express")
const VideoRoutes=express.Router()
const VideoModel=require("../Models/VideoModel")
const {verifyTokenAndAdmin}=require("../Middleware/VerifyAdmin")
const cloudinary = require('cloudinary').v2

cloudinary.config({ 
  cloud_name: 'dpsectfap', 
  api_key: '645263912586772', 
  api_secret: 'SZCeB2lDFVWra0XIRcfpDCsrFNk',
  secure: true
})

//create

VideoRoutes.post("/post",verifyTokenAndAdmin,async(req,res)=>{
    const {description}=req.body
     const file=req.files.video

    cloudinary.uploader
.upload(file.tempFilePath,{resource_type: "video", public_id: `codiis/${Date.now()}`,
  overwrite: true, notification_url: "https://mysite.example.com/notify_endpoint"},async(err,result)=>{
    if(result){
            const newVideoData=new VideoModel({description,video:result.url})
            const savedVideoData=await newVideoData.save()
            return res.send({message:"Video data has been added successfully",data:savedVideoData})
        }
        else{
             return res.send({message:"Currupt Video Found"})
        }
  })
})

//get all

VideoRoutes.get("/",async(req,res)=>{
    const allVideoData=await VideoModel.find()
    const count=await VideoModel.countDocuments()
     return res.send({data:allVideoData,total:count});
})

//update

VideoRoutes.put("/:id",verifyTokenAndAdmin,async(req,res)=>{
    const {description}=req.body
    console.log(req.files);

     try {
        if(req.files){
            const file=req.files.video

            cloudinary.uploader.upload(file.tempFilePath,{resource_type: "video", public_id: `codiis/${Date.now()}`,
  overwrite: true, notification_url: "https://mysite.example.com/notify_endpoint"},async(err,result)=>{
    if(result){
         const updatedVideoData = await VideoModel.findByIdAndUpdate({_id:req.params.id},{description,video:result.url},{ new: true });
            return res.send({message:"Video Data Updated Succesfully",data:updatedVideoData});
    }
    else{
             return res.send({message:"Currupt Video Found"})
        }
  })
           
        }
        else{
            const updatedVideoData = await VideoModel.findByIdAndUpdate({_id:req.params.id},{description},{ new: true });
            return res.send({message:"Video Data Updated Succesfully",data:updatedVideoData});
        }
  } catch (err) {
    return res.send({message:"Update failed"});
  }
})

//delete

VideoRoutes.delete("/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
         await VideoModel.findByIdAndDelete(req.params.id);
    return res.send({message:"Video has been deleted succesfully..."});
    }
    catch(err){
    return res.send(err);
    }
})




module.exports=VideoRoutes
