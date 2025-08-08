import express from "express";
import { createUser, forgotPassword, getAllUsers, getUser, loginUser, updateUser } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/", createUser);
authRouter.post("/login", loginUser);
authRouter.get("/:id", getUser);
authRouter.put("/:id", updateUser);
authRouter.get("/", getAllUsers);
authRouter.post("/forgot-password", forgotPassword);

export default authRouter;