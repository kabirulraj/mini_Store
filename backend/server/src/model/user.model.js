import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength: [3, "Name must be at last 3 charaters long"],
        maxLength:[50, "Name must be at last 50 charaters long"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    passwordHash:{
        type:String,
        required:true, 
    },
    refreshToken:{
        type:String
    }
})

const userModel = mongoose.model("user", userSchema)

export default userModel