import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
    userId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
    content: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Journal = mongoose.model("Journal", journalSchema)

export default Journal