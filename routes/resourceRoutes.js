import express from "express"
import { createResource, deleteResource, getResource, getResources, updateResource } from "../controller/resourcesController.js";

const resourceRouter = express.Router()

resourceRouter.post("/", createResource)
resourceRouter.put("/:id", updateResource)
resourceRouter.get("/", getResources)
resourceRouter.get("/:id", getResource)
resourceRouter.delete("/:id", deleteResource)

export default resourceRouter