import mongoose from "mongoose"

const supportSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "new"
    }
}, {timestamps: true})

const Support = mongoose.model("Support", supportSchema)

export default Support