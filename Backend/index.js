const express = require('express')
const mongoose=require('mongoose')
const app = express()
const dotenv=require('dotenv')
const cors=require("cors")
const multer=require('multer')
const path=require("path")
const cookieParser=require('cookie-parser')
const authRoute=require('./Routes/auth.js')
const userRouter=require('./Routes/user.js')
const postRouter=require('./Routes/posts.js')
const commentRoute =require('./Routes/comment.js')

// database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("database is connected successfully!")
    }
    catch (err) {
        console.log(err)
    }
}


//middlewares
dotenv.config()
app.use(express.json())
app.use(cookieParser())
app.use("/images",express.static(path.join(__dirname,"/images")))
app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use("/api/auth",authRoute)
app.use("/api/user",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/comments",commentRoute)


//image upload
const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        fn(null,req.body.img)
        //fn(null,"image1.jpg")
    }
})


const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    //console.log(req.body)
    res.status(200).json("Image has been uploaded successfully!")
})


app.listen(process.env.PORT, () => {
    connectDB()
    console.log("app is running on port  "+process.env.PORT)
})