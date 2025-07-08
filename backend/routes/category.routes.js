import express from "express";
import { addCategoryController, getCategoryController } from "../controllers/category.controller.js";
import { isAdmin } from "../middleware/isAdmin.middle.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const categoryRouter = express.Router();

categoryRouter.post("/",isAuthenticated,isAdmin, addCategoryController);
categoryRouter.get("/",isAuthenticated,isAdmin, getCategoryController);

export default categoryRouter;
