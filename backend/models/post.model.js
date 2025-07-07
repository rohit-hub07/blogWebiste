import mongoose from "mongoose";
import slugify from "slugify";
import { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [String],
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    coverImage: String,
    readTime: Number,
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
      trim: true,
    });
  }
  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
