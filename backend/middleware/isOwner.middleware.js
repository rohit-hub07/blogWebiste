import Post from "../models/post.model.js";
import { getLoggedInUser } from "../utils/getLoggedInUser.js";

export const isOwner = async (req, res, next) => {
  const { id } = req.params;
  const loggedInuser = await getLoggedInUser(req.userId);
  const post = await Post.findById(id);
  if (!post) {
    return res.status(404).json({
      message: "Post doesn't exist!",
      success: false,
    });
  }

  // console.log("User inside of isOwner: ", loggedInuser);
  if (loggedInuser._id.toString() !== post.author._id.toString()) {
    return res.status(403).json({
      message: "You do not have access to this resource!",
      success: false,
    });
  }
  next();
};
