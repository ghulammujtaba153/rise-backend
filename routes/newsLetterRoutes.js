import express from "express";
import { createLetter, deleteLetter, getAllLetter, getLetter } from "../controller/newsLetterController.js";


const newsLetterRouter = express.Router()



newsLetterRouter.post("/", createLetter)

newsLetterRouter.get("/", getAllLetter)


newsLetterRouter.get("/:id", getLetter)

newsLetterRouter.delete("/:id", deleteLetter)

export default newsLetterRouter