import express from "express"
import { createPromotion, deletePromotion, getAllPromotion, getPromotion, updatePromotion, updateStatusPromotion } from "../controller/promotionController.js"


const promotionRouter = express.Router()

promotionRouter.post("/", createPromotion)
promotionRouter.get("/get", getPromotion)
promotionRouter.get("/getall", getAllPromotion)
promotionRouter.put("/update/:id", updatePromotion)
promotionRouter.delete("/delete/:id", deletePromotion)
promotionRouter.put("/updatestatus/:id", updateStatusPromotion)


export default promotionRouter