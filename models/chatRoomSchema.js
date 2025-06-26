import mongoose from "mongoose";


const chatRoomSchema = mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})


const ChatRoom = mongoose.model("ChatRoom", chatRoomSchema)

export default ChatRoom