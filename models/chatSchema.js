import mongoose from "mongoose";


const chatSchema = new mongoose.Schema({
    chatRoom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatRoom"
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    message: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const Chat = mongoose.model("Chat", chatSchema)

export default Chat