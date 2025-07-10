import express from "express";
import {
  approved,
  deletePostController,
  editPostController,
  getAllPostsController,
  getPostByIdController,
  pendingBlog,
  rejectedBlog,
  uploadBlogController,
} from "../controllers/post.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
import { isOwner } from "../middleware/isOwner.middleware.js";


const postRouter = express.Router();

postRouter.get("/rejected-blogs",isAuthenticated,rejectedBlog);
postRouter.get("/pending-blogs",isAuthenticated, pendingBlog);
postRouter.get("/approved-blogs", approved);
postRouter.post("/", isAuthenticated, uploadBlogController);
postRouter.get("/", getAllPostsController);
postRouter.get("/:id", getPostByIdController);
postRouter.put("/:id", isAuthenticated, isOwner, editPostController);
postRouter.delete("/:id", isAuthenticated, isOwner, deletePostController);


export default postRouter;
