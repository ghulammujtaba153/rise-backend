import express from "express"
import { createClickAction, getClickActionByLastTenDays, getUserClickActions } from "../controller/clickActionController.js"


const clickActionRouter = express.Router()

clickActionRouter.post("/", createClickAction)
clickActionRouter.get("/user/:userId", getUserClickActions)
clickActionRouter.get("/lastTenDays/:userId", getClickActionByLastTenDays)

export default clickActionRouter