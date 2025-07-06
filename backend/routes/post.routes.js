import express from "express";
import { uploadBlogController } from "../controllers/post.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const postRouter = express.Router();

postRouter.post("/",isAuthenticated, uploadBlogController)

export default postRouter;
