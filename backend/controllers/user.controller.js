import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Post from "../models/post.model.js";
import dotenv from "dotenv";

dotenv.config();


export const registerController = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        messgae: "All fields are required!",
        success: false,
      });
    }
    // check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists!",
        success: false,
      });
    }

    const newUser = await User.create({ name, email, password, role });
    // console.log("newuser: ", newUser);

    if (!newUser) {
      return res.status(500).json({
        message: "Something went wrong!",
        success: false,
      });
    }
    const token = jwt.sign(
      { id: newUser._id, name: newUser.name, email: newUser.email },
      process.env.JWTSECRET,
      { expiresIn: "24h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false in dev
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    newUser.save();
    res.status(201).json({
      message: "User registered successfully",
      success: true,
      newUser,
    });
  } catch (error) {
    // console.log("Error registering the user: ", error);
    return res.status(500).json({
      message: "Error registering the user",
      success: false,
    });
  }
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }
    //check if user exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "User doesn't exist!",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    // console.log("isMatch: ", isMatch);
    if (!isMatch) {
      return res.status(401).json({
        message: "Email or password is incorrect!",
        success: false,
      });
    }
    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWTSECRET,
      { expiresIn: "24h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // false in dev
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User loggedIn successfully",
      success: true,
      user,
    });
  } catch (error) {
    // console.log("Error logging the user: ", error);
    return res.status(500).json({
      message: "Error logging the user",
      success: false,
    });
  }
};

export const logoutController = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error logging out!",
      success: false,
    });
  }
};

export const profileController = async (req, res) => {
  try {
    const id = req.userId;
    const posts = await Post.find({ author: { _id: id } }).populate("author");
    if (!id) {
      return res.status(401).json({
        message: "Please login!",
        success: false,
      });
    }
    const loggedInUser = await User.findById(id).select("-password");
    if (!loggedInUser) {
      return res.status(401).json({
        message: "Please login!",
        success: false,
      });
    }
    res.status(200).json({
      message: "User profile fetched successfully",
      success: true,
      loggedInUser,
      posts,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Please login!",
      success: false,
    });
  }
};
