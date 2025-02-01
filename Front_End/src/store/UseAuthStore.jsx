import { create } from 'zustand'; //IMPORTED THIS LIBRARY

import { axiosInstance } from '../lib/axios.js';
import toast from "react-hot-toast";


export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false, // THIS IS USED TO CHECK WEATHER THE USER IS SINGING UP OR NOT
  isLoggingIng: false, // THIS IS USED TO CHECK WEATHER THE USER IS LOGGING IN OR NOT
  isUpdatingProfile: false, // THIS IS USED TO CHECK WEATHER THE USER IS UPDATING PROFILE OR NOT
  isCheckingAuth: true, //THIS IS USED TO CHECK WEATHER THE USER IS AUTHENTICATED OR NOT

  // Check authentication status when the app loads
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data }); //HEAR WE SET THE AUTH USER
    } catch (err) {
      console.log(err);
      set({ authUser: null });
    } finally {
      //THIS SET FALSE IF THE USER IS NOT AUTH
      set({ isCheckingAuth: false });
    }
  },

  //THIS IS FOR THE SIGN UP PROCESS
  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data }); //HEAR WE SET THE AUTH USER
      toast.success("Account Created Successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  //THIS IS FOR LOGIN
  login: async (data) => {
    set({ isLoggingIng: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data }); //HEAR WE SET THE AUTH USER
      toast.success("Login Successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isLoggingIng: false });
    }
  },
  //THIS IS FOR LOGOUT
  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logout Successfully");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  },
  //THIS IS TO UPDATE THE PROFILE PICTURE
  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.patch("/auth/update-profile", data);
      set({ authUser: res.data }); //HEAR WE SET THE AUTH USER
      toast.success("Profile Updated Successfully");
    } catch (error) {
      toast.error(`Image Not Added ${error.response.data.message}`);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
}));
