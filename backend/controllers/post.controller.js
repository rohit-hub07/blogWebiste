import Post from "../models/post.model.js";
import { getLoggedInUser } from "../utils/getLoggedInUser.js";

export const uploadBlogController = async (req, res) => {
  const { title, content, tags, coverImage, readTime } = req.body;
  try {
    if (!title || !content || !coverImage || !readTime) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }
    const id = req.userId;
    const currUser = await getLoggedInUser(id);

    const post = await Post.create({
      title,
      content,
      author: currUser,
      tags,
      coverImage,
      readTime,
    });
    if (!post) {
      return res.status(500).json({
        message: "Something went wrong!",
        success: false,
      });
    }
    post.save();
    res.status(200).json({
      message: "Post added for review!",
      success: true,
      post,
    });
  } catch (error) {
    console.log("Error creating post", error);
    return res.status(500).json({
      message: "Error creating post!",
      success: false,
    });
  }
};
