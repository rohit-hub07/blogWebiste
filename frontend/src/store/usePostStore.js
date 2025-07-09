import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const usePostStore = create((set) => ({
  post: null,
  posts: [],
  isPostLoading: false,
  isCreatingPost: false,
  isPostsLoading: false,
  isRejectedPostLoading: false,
  rejectedPosts: [],

  getAllPosts: async () => {
    set({ isPostsLoading: true });
    try {
      const res = await axiosInstance.get("/posts");
      set({ posts: res.data.allPosts });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error getting the blogs!");
    } finally {
      set({ isPostsLoading: false });
    }
  },

  getPostById: async (id) => {
    set({ isPostLoading: true });
    try {
      console.log("id inside of usePostStore: ",id)
      const res = await axiosInstance.get(`/posts/${id}`);
      set({ post: res.data.post });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error fetching blog!");
    } finally {
      set({ isPostLoading: false });
    }
  },

  uploadPost: async (data) => {
    set({ isCreatingPost: true });
    try {
      const res = await axiosInstance.post("/posts", data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error);
    } finally {
      set({ isCreatingPost: false });
    }
  },

  updatePost: async (id, data) => {
    try {
      const res = await axiosInstance.put(`/posts/${id}`, data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error updating the post!");
    }
  },
  deletePost: async (id) => {
    try {
      const res = await axiosInstance.delete("/posts/:id");
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error deleting the blog!");
    }
  },

  rejectedPosts: async () => {
    set({ isRejectedPostLoading: true });
    try {
      const res = await axiosInstance.get("/posts/rejected-blogs");
      set({ rejectedPosts: res.data.posts });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error fetching the data");
    } finally {
      set({ isRejectedPostLoading: false });
    }
  },
}));
