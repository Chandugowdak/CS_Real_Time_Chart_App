import express from "express";
import multer from "multer";
import {
  signup,
  login,
  logout,
  updateProfile,
  checkAuth,
} from "../controllers/AuthintControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Configure Multer for File Uploads (Profile Pictures)
const storage = multer.memoryStorage();

// ✅ Multer File Filter to Allow Only Images
const fileFilter = (req, file, cb) => {
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};

// ✅ Multer Configuration (2MB file size limit, only images allowed)
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

// ✅ Authentication Routes
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

// ✅ Update Profile with Image Support
router.patch(
  "/update-profile",
  protectRoute,
  upload.single("profilePic"), // ✅ Ensure this matches frontend field name
  (req, res, next) => {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded!" });
    }
    next();
  },
  updateProfile
);

// ✅ Check Auth Route
router.get("/check", protectRoute, checkAuth);

export default router;
