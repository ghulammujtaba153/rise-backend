import express from "express"
import { craeteSubscribed, deleteSubscribed, getSubscribedUsers } from "../controller/subscribedController.js"


const subscribedRouter = express.Router()

subscribedRouter.post("/", craeteSubscribed)
subscribedRouter.get("/", getSubscribedUsers)
subscribedRouter.delete("/:id", deleteSubscribed)

export default subscribedRouter