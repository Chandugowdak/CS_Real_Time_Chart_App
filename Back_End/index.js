// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import { connectDB } from './lib/db.js';
// import authRoutes from "./routes/auth.js";
// import messageRoutes from "./routes/message.js";
// import { app , server } from './lib/socket.js';

// dotenv.config(); // IMPORTING FROM THE DOTENV FILE

// app.use(express.json()); // USING THE MIDDLEWARE
// app.use(cookieParser()); // USING TO PARSE THE COOKIES
// app.use(cors(
//     {
//         origin: "http://localhost:5173",
//         credentials: true,
//     }
// ));      // USING THE MIDDLEWARE

// const Port = process.env.Port || 5000;//IMPORTING FROM THE DOTENV FILE

// app.use("/api/auth", authRoutes);
// app.use("/api/message", messageRoutes);

// server.listen(Port, () => {
//     console.log(`Server is Running in The Portel ${Port}`);

//     connectDB(); //FUNCTION TO CONNECT TO THE DATABASE
// })

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer"; // ✅ File upload handling
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";
import { app, server } from "./lib/socket.js";

// ✅ Load environment variables before anything else
dotenv.config();

// ✅ Middleware setup
app.use(express.json()); // Parses JSON requests
app.use(cookieParser()); // Parses cookies
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Allow frontend requests
    credentials: true, // ✅ Support cookies
  })
);

// ✅ Configure Multer for File Uploads
const upload = multer({ storage: multer.memoryStorage() });
app.use(upload.single("image")); // Supports image uploads

// ✅ Database connection
connectDB();

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

// ✅ Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// ✅ Start the Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
