import { create } from "zustand";
import { io } from "socket.io-client";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";


const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  // Check Authentication
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (err) {
      console.log(err);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Signup
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
      get().connectSocket(); // Connect socket after signup
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  // Login
  login: async (data) => {
    set({ isLoggingIng: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Login Successfully");
      get().connectSocket(); // Connect socket after login
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIng: false });
    }
  },

  // Logout
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout Successfully");
      get().disconnectSocket(); // Disconnect socket after logout
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },

  // Update Profile
  updateProfile: async (selectedFile) => {
    set({ isUpdatingProfile: true });

    try {
      if (!selectedFile) {
        toast.error("No image selected!");
        return;
      }

      // ✅ Check if the file is an image (prevent non-image uploads)
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Invalid file type! Please upload an image.");
        return;
      }

      const formData = new FormData();
      formData.append("profilePic", selectedFile); // ✅ Attach actual file

      console.log("📤 Uploading profile picture...");

      const res = await axiosInstance.patch("/auth/update-profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ Ensure token is sent
        },
      });

      set({ authUser: res.data });
      toast.success("✅ Profile Updated Successfully");

      console.log("✅ Profile update response:", res.data);
    } catch (error) {
      console.error("❌ Error updating profile:", error);

      if (error.response) {
        // Server responded with an error
        toast.error(`❌ ${error.response.data.message || "Update failed"}`);
      } else if (error.request) {
        // No response from server (network issue)
        toast.error("⚠️ No response from server. Check your connection.");
      } else {
        // Other errors (e.g., request setup issue)
        toast.error("❌ An error occurred. Please try again.");
      }
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  // Connect Socket
  connectSocket: () => {
    // THIS WILL CALL THE USER IS LOGIN OR NOT IF NOT JUST RETURN
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return; //IT THE SOCKET IS ALREDY CONNECTED JUST RETUE BACK
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();
    set({ socket: socket }); //UPDATE THE SOCKET IN THE STATE
    socket.on("getOnlineUsers", (userIds) => {
      //THEN WILL BE UPDATING THE ONLINEUSER STATE
      set({ onlineUsers: userIds });
    });
  },
  //DISCONNECT THE SOCKET
  disconnectSocket: () => {
    // THIS WILL DISCONNECT IF THE SOCKET IS BEEN CONNECTED
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
