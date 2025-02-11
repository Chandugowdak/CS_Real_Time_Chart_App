import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express(); // CREATE THE EXPRESS INSTANCE
const server = http.createServer(app); // CREATE THE HTTP SERVER

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

// ✅ Define userSocketMap before using it
const userSocketMap = {};

// ✅ Function to get a receiver's socket ID
export function getReceiverSocketId(userId) {
  return userSocketMap[userId]; // WILL RETURN THE SOCKET ID OF THE USER
}

// 🔵 SOCKET CONNECTION HANDLER
io.on("connection", (socket) => {
  console.log("✅ New User Connected:", socket.id);

  // 🔹 Get user ID from socket handshake query
  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id; // ✅ Store user ID & socket ID
  }

  // 🔹 Emit updated list of online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // 🔴 Handle user disconnecting
  socket.on("disconnect", () => {
    console.log("🔴 User Disconnected:", socket.id);
    delete userSocketMap[userId]; // ✅ Remove user from map
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };
