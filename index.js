const express=require("express");
const cors=require("cors");
require("dotenv").config();

const app=express();
app.use(express.json());
app.use(cors());

const connection=require("./Config/config");
const UserRoutes=require("./Routes/UserRoutes")
const VideoRoutes=require("./Routes/VideoRoutes")
const PlanRoutes=require("./Routes/PlanRoutes")
const BuyPlanRoutes=require("./Routes/BuyPlanRoutes")

const fileUpload=require("express-fileupload")
app.use(fileUpload({
    useTempFiles : true
}));

app.use("/user",UserRoutes)
app.use("/video",VideoRoutes)
app.use("/plan",PlanRoutes)
app.use("/buy",BuyPlanRoutes)

app.get("/",(req,res)=>{
    return res.status(200).send("HomePage")
})

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("DB Connected")
    }
    catch(err){
        console.log(err)

    }
    console.log(`DB Connected at port ${process.env.PORT}`)
})

