import express from "express"
import { sendEmail } from "../controller/quizController.js"


const quizRouter = express.Router()


quizRouter.post("/", sendEmail)


export default quizRouter