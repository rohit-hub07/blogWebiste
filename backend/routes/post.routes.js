import express from "express";
import {
  deletePostController,
  editPostController,
  getAllPostsController,
  getPostByIdController,
  uploadBlogController,
} from "../controllers/post.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isOwner } from "../middleware/isOwner.middleware.js";

const postRouter = express.Router();

postRouter.post("/", isAuthenticated, uploadBlogController);
postRouter.get("/", getAllPostsController);
postRouter.get("/:id", getPostByIdController);
postRouter.put("/:id", isAuthenticated,isOwner, editPostController);
postRouter.delete("/:id", isAuthenticated,isOwner, deletePostController);

export default postRouter;
