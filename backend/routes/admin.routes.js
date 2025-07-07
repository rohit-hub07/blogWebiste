import express from "express";
import {
  approveBlogController,
  getPendingPostController,
  rejectBlogController,
} from "../controllers/admin.controller.js";
import { isAdmin } from "../middleware/isAdmin.middle.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
const adminRouter = express.Router();

adminRouter.get("/posts",isAuthenticated, isAdmin, getPendingPostController);
adminRouter.put("/posts/:id/approve",isAuthenticated, isAdmin, approveBlogController);
adminRouter.put("/posts/:id/reject",isAuthenticated, isAdmin, rejectBlogController);
export default adminRouter;
