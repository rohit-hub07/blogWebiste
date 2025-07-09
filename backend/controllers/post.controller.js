import Post from "../models/post.model.js";
import { getLoggedInUser } from "../utils/getLoggedInUser.js";

export const uploadBlogController = async (req, res) => {
  const { title, content, tags, coverImage, readTime } = req.body;
  console.log("coverImage: ", coverImage);
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
      author: req.userId,
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
    await post.save();
    res.status(200).json({
      message: "Blog added for review!",
      success: true,
      post,
      currUser,
    });
  } catch (error) {
    console.log("Error creating post", error);
    return res.status(500).json({
      message: "Error creating post!",
      success: false,
    });
  }
};

export const getAllPostsController = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("author").populate("category");
    if (!allPosts) {
      return res.status(500).json({
        message: "Something went wrong!",
        success: false,
      });
    }
    res.status(200).json({
      message: "Posts fetched successfully",
      success: true,
      allPosts,
    });
  } catch (error) {
    console.log("Error fetching posts!", error);
    return res.status(500).json({
      message: "Error fetching posts!",
      success: false,
    });
  }
};

export const getPostByIdController = async (req, res) => {
  const { id } = req.params;
  // const { slug } = req.params;
  try {
    // if (!slug) {
    //   return res.status(404).josn({
    //     message: "Something went wrong!",
    //     success: false,
    //   });
    // }
    if (!id) {
      return res.status(404).josn({
        message: "Something went wrong!",
        success: false,
      });
    }
    // const post = await Post.findOne({slug}).populate("author").populate("category");
    const post = await Post.findById(id)
      .populate("author")
      .populate("category");
    if (!post) {
      return res.status(400).json({
        message: "Post doesn't exist!",
        success: false,
      });
    }
    res.status(200).json({
      message: "Blog fetched successfully",
      success: true,
      post,
    });
  } catch (error) {
    console.log("Error fetching the blog!", error);
    return res.status(500).json({
      message: "Error fetching the blog!",
      success: false,
    });
  }
};

export const editPostController = async (req, res) => {
  const { title, content, tags, coverImage, readTime } = req.body;
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({
        message: "Blog doesn't exists!",
        success: false,
      });
    }
    if (!title || !content || !tags || !coverImage || !readTime) {
      return res.status(400).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const post = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title,
        content,
        tags,
        coverImage,
        readTime,
      }
    );
    if (!post) {
      return res.status(404).json({
        message: "Blog doesn't exists!",
        success: false,
      });
    }
    await post.save();
    res.status(200).json({
      message: "Blog updated successfully",
      success: true,
      post,
    });
  } catch (error) {}
};

export const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(404).json({
        message: "Post doesn't exist!",
        success: false,
      });
    }
    const post = await Post.findByIdAndDelete(id);
    res.status(200).json({
      message: "Blog deleted successfully",
      success: true,
      deletedPost: post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting the blog!",
      success: true,
    });
  }
};

export const rejectedBlog = async (req, res) => {
  try {
    const posts = await Post.find({ status: "rejected" });
    if (posts.length === 0) {
      return res.status(404).json({
        message: "No rejected blogs!",
        success: false,
      });
    }
    res.status(200).json({
      message: "Rejected Blogs fetched successfully",
      success: true,
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};
