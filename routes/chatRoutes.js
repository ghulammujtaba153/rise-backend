import express from "express"
import { createChatRoom, getChatRoom, getMessages, sendMessage } from "../controller/chatController.js"


const chatRouter = express.Router()


chatRouter.post("/", sendMessage)
chatRouter.get("/room/:id", getChatRoom)
chatRouter.post("/room", createChatRoom)
chatRouter.get("/:id", getMessages)

export default chatRouter