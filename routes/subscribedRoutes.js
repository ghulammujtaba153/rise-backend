import express from "express"
import { craeteSubscribed, getSubscribedUsers } from "../controller/subscribedController.js"


const subscribedRouter = express.Router()

subscribedRouter.post("/", craeteSubscribed)
subscribedRouter.get("/", getSubscribedUsers)

export default subscribedRouter