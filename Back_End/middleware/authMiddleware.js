//WE ARE USING COOKI-PARSER TO GRAB THE COOKIES FROM THE REQUEST
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      console.log("❌ No JWT token found in cookies");
      return res.status(401).json({ message: "Please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      console.log("❌ Invalid JWT token");
      return res.status(401).json({ message: "Token is invalid" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      console.log("❌ User not found for decoded ID:", decoded.userId);
      return res.status(401).json({ message: "User not found" });
    }

    console.log("✅ Authenticated User ID:", user._id);
    req.user = user; // 🔹 Set `req.user`
    next();
  } catch (err) {
    console.error("❌ Authentication Error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
