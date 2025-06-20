import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    mainImage:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Blog = mongoose.model("Blog", blogSchema)

export default Blog