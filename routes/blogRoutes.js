import express from "express"
import { createBlog, getBlogs, getBlog, updateBlog, deleteBlog } from "../controller/blogController.js";


const blogRouter = express.Router()

blogRouter.post("/", createBlog)
blogRouter.get("/", getBlogs)
blogRouter.get("/:id", getBlog)
blogRouter.put("/:id", updateBlog)
blogRouter.delete("/:id", deleteBlog)

export default blogRouter