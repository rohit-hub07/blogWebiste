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
    coverImage: {
      type: String,
      default: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80",
    },
    readTime: {
      type: Number,
      default: 3,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  if (this.isModified("title") || !this.slug) {
    const baseSlug = slugify(this.title || "post", {
      lower: true,
      strict: true,
      trim: true,
    });
    this.slug = `${baseSlug}-${Date.now().toString(36)}`;
  }
  next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;
