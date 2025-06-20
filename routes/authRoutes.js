import express from "express";
import { createUser, getUser, loginUser, updateUser } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/", createUser);
authRouter.post("/login", loginUser);
authRouter.get("/:id", getUser);
authRouter.put("/:id", updateUser);

export default authRouter;