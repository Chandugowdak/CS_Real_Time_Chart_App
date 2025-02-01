import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import {
  getusersForSidebar,
  getMessages,
  sendMessage,
} from "../controllers/messageController.js";

const router = express.Router();

router.get('/users', protectRoute, getusersForSidebar)
router.get('/:id', protectRoute, getMessages);
router.post('/:id', protectRoute, sendMessage);




export default router;