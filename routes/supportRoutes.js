import express from "express";
import { createSuppport, getSupport, deleteSupport } from "../controller/supportController.js";


const supportRouter = express.Router()

supportRouter.post("/", createSuppport)
supportRouter.get("/", getSupport)
supportRouter.delete("/:id", deleteSupport)

export default supportRouter