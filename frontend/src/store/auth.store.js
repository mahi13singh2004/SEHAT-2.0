import axios from "axios";
import { create } from "zustand";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
  loading: false,
  err: null,
  user: null,

  signup: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post(
        "https://sehat-2-0-backend.onrender.com/api/auth/signup",
        data
      );
      set({ user: res.data.user });
    } catch (error) {
      set({ err: error.response?.data?.message || "Signup failed" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  login: async (data) => {
    try {
      set({ loading: true });
      const res = await axios.post(
        "https://sehat-2-0-backend.onrender.com/api/auth/login",
        data
      );
      set({ user: res.data.user });
    } catch (error) {
      set({ err: error.response?.data?.message || "Login failed" });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  checkAuth: async () => {
    try {
      set({ loading: true, err: null });
      const res = await axios.get(
        "https://sehat-2-0-backend.onrender.com/api/auth/checkAuth"
      );
      set({ user: res.data.user });
    } catch (error) {
      console.log("Check Auth Error:", error);
      set({
        user: null,
        err: error.response?.data?.message || "Unable to authenticate",
      });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      set({ loading: true, err: null });
      await axios.post(
        "https://sehat-2-0-backend.onrender.com/api/auth/logout",
        {},
        { withCredentials: true }
      );
      set({ user: null });
    } catch (error) {
      console.log("Logout Error:", error);
      set({ err: "Logout failed" });
    } finally {
      set({ loading: false });
    }
  },
}));
