import Comment from "../models/comment.model.js";
import Post from "../models/post.model.js";
import { getLoggedInUser } from "../utils/getLoggedInUser.js";

export const getAllCommentsController = async (req, res) => {
  try {
    const allComments = await Comment.find();
    if (!allComments) {
      return res.status(404).json({
        message: "Comments doesn't exists!",
        success: false,
      });
    }

    res.status(200).json({
      message: "Comments fetched successfully",
      success: true,
      allComments,
    });
  } catch (error) {
    console.log("Error getting the comments!", error);
    return res.status(500).json({
      message: "Error getting the comments!",
      success: false,
    });
  }
};

export const addCommentController = async (req, res) => {
  const { description } = req.body;
  const { id } = req.params; //this is the blog id
  console.log("id inside of the blog inside of addcomment controller : ", id);
  console.log("User inside of addComment controller: ", user);
  try {
    // checking if the id is valid or not
    if (!id) {
      return res.status(404).json({
        message: "Blog doesn't exist!",
        success: false,
      });
    }
    //getting cuurent loggedin user id
    const userId = req.userId;
    const user = await getLoggedInUser(userId);
    if (!user) {
      return res.status(404).json({
        message: "Please login first to add comments!",
        success: false,
      });
    }

    const newComment = await Comment.create({
      description,
      user: user._id,
      post: id,
    });
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({
        message: "Post doesn't exists!",
        success: false,
      });
    }
    post.comments.push(newComment);
    await post.save();

    res.status(200).json({
      message: "Comment added successfully",
      success: true,
    });
  } catch (error) {
    console.log("Error adding comments!", error);
    return res.status(500).json({
      message: "Error adding comments!",
      success: true,
    });
  }
};

// get the post id from the url and validate
// delete the comment from the comment model as well as the post model
// use pull to delete it from the post model like this Post
export const deleteCommnetController = async(req, res) => {}