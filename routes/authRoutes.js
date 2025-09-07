import express from "express";
import { createUser, deleteUser, forgotPassword, getAllUsers, getUser, loginUser, updateUser } from "../controller/authController.js";

const authRouter = express.Router();

authRouter.post("/add", createUser);
authRouter.post("/login", loginUser);
authRouter.get("/:id", getUser);
authRouter.put("/:id", updateUser);
authRouter.get("/", getAllUsers);
authRouter.post("/forgot-password", forgotPassword);
authRouter.delete("/:id", deleteUser);

export default authRouter;