import Category from "../models/categories.model.js";
import Post from "../models/post.model.js";

export const addCategoryController = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      message: "All fields are required!",
      success: false,
    });
  }
  const category = await Category.create({ name });
  if (!category) {
    return res.status(500).json({
      message: "Error creating category!",
      success: false,
    });
  }
  res.status(200).json({
    message: "Category added successfully!",
    success: true,
    category,
  });
};

export const getCategoryController = async (req, res) => {
  const categories = await Category.find();
  if (!categories) {
    return res.status(404).json({
      message: "No categories listed!",
      success: false,
    });
  }
  res.status(200).json({
    message: "Category fetched successfully",
    success: true,
    categories,
  })
};
