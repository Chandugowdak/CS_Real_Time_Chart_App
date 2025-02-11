import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./UseAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // ✅ FETCH USERS
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.filterUsers || [] });
    } catch (error) {
      console.error("❌ Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // ✅ FETCH MESSAGES
  getMessages: async (userId) => {
    if (!userId) {
      console.error("⚠️ getMessages Error: userId is undefined");
      return;
    }

    set({ isMessagesLoading: true });
    try {
      console.log("📩 Fetching messages from API for:", userId);
      const res = await axiosInstance.get(`/message/${userId}`);
      console.log("✅ Messages received from API:", res.data);

      set({ messages: res.data.messages || [] });
    } catch (error) {
      console.error("❌ Error fetching messages:", error);
      toast.error(error.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // ✅ SEND MESSAGE (FIXED)
  sendMessage: async (messageData) => {
    const { selectedUser } = get();

    if (!selectedUser || !selectedUser._id) {
      toast.error("No user selected!");
      return;
    }

    if (!messageData || !messageData.text) {
      toast.error("Message content is empty!");
      return;
    }

    try {
      console.log("📩 Sending message to:", selectedUser._id);
      console.log("📝 Message Data:", messageData);

      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );

      if (!res.data || !res.data._id) {
        console.error("❌ Invalid response from server:", res.data);
        throw new Error("Invalid response from server");
      }

      // ✅ Ensure `messages` is always an array
      set((state) => ({
        messages: [...(state.messages || []), res.data], // Fix: Use `res.data` directly
      }));

      console.log("✅ Updated Messages in Store:", get().messages);
    } catch (err) {
      console.error(
        "❌ Error sending message:",
        err.response?.data || err.message
      );
      toast.error(err.response?.data?.message || "Failed to send message");
    }
  },

  // ✅ LISTEN TO NEW MESSAGES (SUBSCRIBE)
  subscribeToNewMessage: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) {
      console.error("⚠️ Socket connection not found");
      return;
    }

    console.log("🔵 Subscribing to new messages for:", selectedUser._id);

    socket.on("newMessage", (newMessage) => {
      console.log("📩 Real-time message received:", newMessage);

      if (
        newMessage.senderId === selectedUser._id ||
        newMessage.receiverId === selectedUser._id
      ) {
        set((state) => ({
          messages: [...(state.messages || []), newMessage],
        }));
      }
    });
  },

  // ✅ UNSUBSCRIBE FROM MESSAGES
  unsubscribeToNewMessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    console.log("🔴 Unsubscribing from new messages");
    socket.off("newMessage");
  },

  // ✅ SET SELECTED USER
  setSelectedUser: (selectedUser) => {
    set({ selectedUser, messages: [] });
    get().getMessages(selectedUser._id);
    get().subscribeToNewMessage();
  },
}));
