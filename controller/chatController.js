import ChatRoom from "../models/chatRoomSchema.js"
import Chat from "../models/chatSchema.js"



export const createChatRoom = async (req, res) => {
    try {
        const chatRoom = await ChatRoom.create(req.body)
        res.status(200).json(chatRoom)
    } catch (error) {
        res.status.json(error)
    }
}


export const getChatRoom = async (req, res) => {
    const { id } = req.params
    try {
        const chatRoom = await ChatRoom.find({ participants: id }).populate("participants")
        res.status(200).json(chatRoom)
    } catch (error) {
        res.status(500).json(error)
    }
}



export const sendMessage = async (req, res) => {

    try {
        const chat = await Chat.create(req.body)
        res.status(200).json(chat)
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getMessages = async (req, res) => {
    const { id } = req.params
    try {
        const messages = await Chat.find({ chatRoom: id }).populate("sender receiver")
        res.status(200).json(messages)
    } catch (error) {
        res.status(500).json(error)
    }
}