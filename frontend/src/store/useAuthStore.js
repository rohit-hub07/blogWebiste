import { create } from "zustand";
import { axiosInstance } from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isUserLoading: "false",
  isSigningUp: false,
  isLogging: false,

  registerUser: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/register", data);
      set({ authUser: res.data.newUser });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error registering the user!");
    } finally {
      set({ isSigningUp: false });
    }
  },

  loginUser: async (data) => {
    set({ isLogging: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.user });
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error logging the user!");
    } finally {
      set({ isLogging: false });
    }
  },
}));
