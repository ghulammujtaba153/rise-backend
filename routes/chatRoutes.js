import express from "express"
import { createChatRoom, getAllChatRoom, getChatRoom, getMessages, sendMessage } from "../controller/chatController.js"


const chatRouter = express.Router()


chatRouter.post("/", sendMessage)
chatRouter.get("/room/:id", getChatRoom)
chatRouter.post("/room", createChatRoom)
chatRouter.get("/:id", getMessages)
chatRouter.get("/", getAllChatRoom)

export default chatRouter