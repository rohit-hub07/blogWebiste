import mongoose from "mongoose";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Category from "../models/categories.model.js";
import { getLoggedInUser } from "../utils/getLoggedInUser.js";

// Curated default high-resolution covers by category
const DEFAULT_COVERS = {
  technology: [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80",
  ],
  engineering: [
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  ],
  design: [
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80",
  ],
  ai: [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
  ],
  productivity: [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1200&q=80",
  ],
};

const getRandomDefaultCover = (categoryName = "") => {
  const cat = categoryName.toLowerCase();
  let pool = DEFAULT_COVERS.default;
  if (cat.includes("tech") || cat.includes("web") || cat.includes("code")) {
    pool = DEFAULT_COVERS.technology;
  } else if (cat.includes("design") || cat.includes("ui") || cat.includes("ux")) {
    pool = DEFAULT_COVERS.design;
  } else if (cat.includes("ai") || cat.includes("intelligence") || cat.includes("data")) {
    pool = DEFAULT_COVERS.ai;
  } else if (cat.includes("product") || cat.includes("career")) {
    pool = DEFAULT_COVERS.productivity;
  } else if (cat.includes("engineer")) {
    pool = DEFAULT_COVERS.engineering;
  }
  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
};

export const uploadBlogController = async (req, res) => {
  const { title, content, tags, coverImage, category, readTime } = req.body;
  try {
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required!",
        success: false,
      });
    }

    const id = req.userId;
    const currUser = await getLoggedInUser(id);
    if (!currUser) {
      return res.status(401).json({
        message: "Unauthorized! User session invalid.",
        success: false,
      });
    }

    // Resolve Category ID if name or ID was passed
    let resolvedCategoryId = undefined;
    let categoryName = "";
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        resolvedCategoryId = category;
        const found = await Category.findById(category);
        if (found) categoryName = found.name;
      } else if (typeof category === "string" && category.trim().length > 0) {
        categoryName = category.trim();
        let existingCat = await Category.findOne({
          name: { $regex: new RegExp(`^${category.trim()}$`, "i") },
        });
        if (!existingCat) {
          existingCat = await Category.create({ name: category.trim() });
        }
        resolvedCategoryId = existingCat._id;
      }
    }

    const calculatedReadTime =
      readTime || Math.max(1, Math.ceil(content.split(/\s+/).length / 200));

    const finalCoverImage =
      coverImage && coverImage.trim().length > 0
        ? coverImage.trim()
        : getRandomDefaultCover(categoryName);

    const postData = {
      title,
      content,
      author: req.userId,
      tags: Array.isArray(tags) ? tags : [],
      readTime: calculatedReadTime,
      status: "pending",
      coverImage: finalCoverImage,
    };

    if (resolvedCategoryId) {
      postData.category = resolvedCategoryId;
    }

    const post = await Post.create(postData);

    res.status(200).json({
      message: "Blog submitted for editorial review!",
      success: true,
      post,
      currUser,
    });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      message: error.message || "Error creating post!",
      success: false,
    });
  }
};

export const getAllPostsController = async (req, res) => {
  try {
    const allPosts = await Post.find().populate("author").populate("category");
    res.status(200).json({
      message: "Posts fetched successfully",
      success: true,
      allPosts: allPosts || [],
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
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Invalid blog post ID!",
        success: false,
      });
    }
    const post = await Post.findById(id)
      .populate("author")
      .populate("category");
    if (!post) {
      return res.status(404).json({
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
  const { title, content, tags, coverImage, category, readTime } = req.body;
  const { id } = req.params;
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Blog doesn't exist!",
        success: false,
      });
    }
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required!",
        success: false,
      });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        message: "Blog doesn't exist!",
        success: false,
      });
    }

    // Resolve Category ID if name or ID was passed
    let categoryName = "";
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        post.category = category;
        const found = await Category.findById(category);
        if (found) categoryName = found.name;
      } else if (typeof category === "string" && category.trim().length > 0) {
        categoryName = category.trim();
        let existingCat = await Category.findOne({
          name: { $regex: new RegExp(`^${category.trim()}$`, "i") },
        });
        if (!existingCat) {
          existingCat = await Category.create({ name: category.trim() });
        }
        post.category = existingCat._id;
      }
    }

    post.title = title;
    post.content = content;
    if (Array.isArray(tags)) post.tags = tags;
    if (coverImage && coverImage.trim().length > 0) {
      post.coverImage = coverImage.trim();
    } else if (!post.coverImage) {
      post.coverImage = getRandomDefaultCover(categoryName);
    }
    if (readTime) post.readTime = readTime;
    post.status = "pending";
    await post.save();

    res.status(200).json({
      message: "Blog updated successfully and submitted for review",
      success: true,
      post,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).json({
      message: "Error updating post",
      success: false,
    });
  }
};

export const deletePostController = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        message: "Invalid post ID!",
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
      success: false,
    });
  }
};

export const rejectedBlog = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const filter = user.role === "admin"
      ? { status: "rejected" }
      : { author: id, status: "rejected" };

    const posts = await Post.find(filter).populate("author").populate("category").sort({ updatedAt: -1 });
    res.status(200).json({
      message: "Rejected Blogs fetched successfully",
      success: true,
      posts: posts || [],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

export const approved = async (req, res) => {
  try {
    const posts = await Post.find({ status: "approved" })
      .populate("author")
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Approved Blogs fetched successfully",
      success: true,
      posts: posts || [],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      success: false,
    });
  }
};

export const pendingBlog = async (req, res) => {
  try {
    const id = req.userId;
    const user = await User.findById(id).lean();
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const filter = user.role === "admin"
      ? { status: "pending" }
      : { author: id, status: "pending" };

    const posts = await Post.find(filter)
      .populate("author")
      .populate("category")
      .sort({ createdAt: -1 });

    res.status(200).json({ 
      message: "Pending Blogs fetched successfully", 
      success: true, 
      posts: posts || [] 
    });
  } catch (error) {
    console.error("Error in pendingBlog:", error);
    res.status(500).json({ message: "Something went wrong!", success: false });
  }
};
