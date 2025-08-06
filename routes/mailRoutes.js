import express from "express"
import { sendEmail } from "../controller/mailController.js"


const mailRoutes = express.Router()

mailRoutes.post("/send", sendEmail)

export default mailRoutes