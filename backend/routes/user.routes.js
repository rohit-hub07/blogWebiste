import express from "express";
import {
  loginController,
  logoutController,
  profileController,
  registerController,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerController);
userRouter.post("/login", loginController);
userRouter.get("/logout",isAuthenticated, logoutController);
userRouter.get("/profile",isAuthenticated, profileController);

export default userRouter;
