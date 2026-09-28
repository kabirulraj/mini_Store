import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, "Name must be at least 3 characters long"],
        maxLength: [50, "Name must be at most 50 characters long"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid email format"]
    },
    passwordHash: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        default: null
    }
}, { timestamps: true })

const userModel = mongoose.model("user", userSchema)

export default userModel
