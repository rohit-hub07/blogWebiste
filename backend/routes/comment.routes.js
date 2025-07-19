import express from "express";
import {
  addCommentController,
  deleteCommnetController,
  getAllCommentsController,
} from "../controllers/comment.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const commentRouter = express.Router();

commentRouter.get("/:id", getAllCommentsController);
commentRouter.post("/add-comment/:id",isAuthenticated, addCommentController);
commentRouter.delete(
  "/delete-comment/:id",
  isAuthenticated,
  deleteCommnetController
);

export default commentRouter;
