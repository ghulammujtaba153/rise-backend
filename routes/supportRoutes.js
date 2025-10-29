import express from "express";
import { createSuppport, getSupport, deleteSupport, updateSupport } from "../controller/supportController.js";


const supportRouter = express.Router()

supportRouter.post("/", createSuppport)
supportRouter.get("/", getSupport)
supportRouter.put("/:id", updateSupport)
supportRouter.delete("/:id", deleteSupport)

export default supportRouter