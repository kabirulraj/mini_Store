import mongoose from "mongoose"
import config from "./config.js"



const connectDB = async()=>{
    await mongoose.connect(config.MONGO_URI)

    console.log("mongo connected")
}

export default connectDB