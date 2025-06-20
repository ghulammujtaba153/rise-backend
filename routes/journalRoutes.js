import express from "express"
import { createJournal, deleteJournal, getJournal, getJournalByUser, updateJournal } from "../controller/journalController.js"

const journalRouter = express.Router()


journalRouter.post("/", createJournal)
journalRouter.get("/:id", getJournalByUser)
journalRouter.get("/single/:id", getJournal)
journalRouter.put("/:id", updateJournal)
journalRouter.delete("/:id", deleteJournal)


export default journalRouter