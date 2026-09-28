import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [2, "Name must be at least 2 characters"],
        maxLength: [100, "Name must be at most 100 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxLength: [500, "Description must be at most 500 characters"]
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"]
    },
    stock: {
        type: Number,
        required: true,
        min: [0, "Stock cannot be negative"],
        default: 0
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }
}, { timestamps: true })

const productModel = mongoose.model("product", productSchema)

export default productModel
