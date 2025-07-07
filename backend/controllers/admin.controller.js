import Post from "../models/post.model.js";

export const getPendingPostController = async (req, res) => {
  try {
    const allPosts = await Post.find({ status: "pending" });
    if (allPosts.length === 0) {
      return res.status(404).json({
        message: "No pending blogs!",
        success: false,
      });
    }
    res.status(200).json({
      message: "Pendind blogs fetched successfully!",
      success: true,
      allPosts,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching blogs!",
      success: false,
    });
  }
};

export const approveBlogController = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        message: "Blog doesn't exist!",
        success: false,
      });
    }
    post.status = "approved";
    await post.save();
    res.status(200).json({
      message: "Blog approves successfully!",
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

export const rejectBlogController = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        message: "Blog doesn't exist!",
        success: false,
      });
    }
    post.status = "rejected";
    await post.save();
    res.status(200).json({
      message: "Blog rejected successfully!",
      success: true,
      post,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};
