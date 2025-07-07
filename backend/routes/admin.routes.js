import express from "express";
import {
  approveBlogController,
  getPendingPostController,
  rejectBlogController,
} from "../controllers/admin.controller.js";
const adminRouter = express.Router();

adminRouter.get("/posts", getPendingPostController);
adminRouter.put("/posts/:id/approve", approveBlogController);
adminRouter.put("/posts/:id/reject", rejectBlogController);
export default adminRouter;
