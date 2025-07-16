import express from "express";
import {
  addCommentController,
  deleteCommnetController,
  getAllCommentsController,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

commentRouter.get("/", getAllCommentsController);
commentRouter.post("/add-comment", addCommentController);
commentRouter.delete("/delete-comment", deleteCommnetController)

export default commentRouter;
