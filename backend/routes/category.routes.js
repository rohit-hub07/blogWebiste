import express from "express";
import { addCategoryController, getCategoryController } from "../controllers/category.controller.js";
import { isAdmin } from "../middleware/isAdmin.middle.js";

const categoryRouter = express.Router();

categoryRouter.post("/",isAdmin, addCategoryController);
categoryRouter.get("/",isAdmin, getCategoryController);

export default categoryRouter;
