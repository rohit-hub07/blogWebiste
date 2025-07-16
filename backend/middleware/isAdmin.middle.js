// import User from "../models/user.model.js";
import { getLoggedInUser } from "../utils/getLoggedInUser.js";

export const isAdmin = async (req, res, next) => {
  // const currId = req.userId;
  // if (!currId) {
  //   return res.status(404).json({
  //     message: "Please login!",
  //     success: false,
  //   });
  // }
  // const currUser = await User.findById({ _id: currId });
  // if (!currUser) {
  //   return res.status(404).json({
  //     message: "User does't exist!",
  //     success: false,
  //   });
  // }
  const currUser = await getLoggedInUser(req.userId);
  if (!currUser) {
    return res.status(404).json({
      message: "User does't exist!",
      success: false,
    });
  }
  // console.log("currUser inside of admin: ", currUser);
  if (currUser.role !== "admin") {
    return res.status(403).json({
      message: "You are not allowed to access this resource!",
      success: false,
    });
  }
  next();
};
