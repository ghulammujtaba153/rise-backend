import express from "express"
import { createNotification, deleteNotification, getNotification, getNotifications, readNotification } from "../controller/notificationController.js"


const notificationRouter = express.Router()


notificationRouter.post("/", createNotification)
notificationRouter.get("/", getNotifications)
notificationRouter.get("/:id", getNotification)
notificationRouter.put("/:id", readNotification)
notificationRouter.delete("/:id", deleteNotification)



export default notificationRouter
