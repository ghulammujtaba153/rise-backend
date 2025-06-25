import mongoose from "mongoose";

const newsLetterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const NewsLetter = mongoose.model("NewsLetter", newsLetterSchema)
export default NewsLetter