// THIS IS USED TO GET THE CHART
import { getReceiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js"; 
import User from "../models/user.js";
import Message from "../middleware/messageAuth.js";
import cloudinary from "../lib/cloudinary.js";
import mongoose from "mongoose";

export const getusersForSidebar = async (req, res) => {
    
    try {
        const loggedInUserId = req.user._id;
       
        //HELP TO FIND ALL USER EXCEPT THE LOGGED IN USER
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } });
        res.status(200).json({filterUsers})
     }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

//GET ALL MESSAGES
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatIdRaw } = req.params;
    const myIdRaw = req.user?._id;

    console.log("📩 Raw userToChatId:", `"${userToChatIdRaw}"`);
    console.log("📩 Raw myId:", `"${myIdRaw}"`);

    // ✅ Trim any whitespace or newline characters
    const userToChatId = userToChatIdRaw?.trim();
    const myId = myIdRaw?.toString().trim();

    console.log("✅ Trimmed userToChatId:", `"${userToChatId}"`);
    console.log("✅ Trimmed myId:", `"${myId}"`);

    // ✅ Check if IDs are valid ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(userToChatId) ||
      !mongoose.Types.ObjectId.isValid(myId)
    ) {
      console.error("❌ Invalid user IDs:", { userToChatId, myId });
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    console.log(`📩 Fetching messages between ${myId} and ${userToChatId}`);

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 });

    console.log("✅ Messages Fetched:", messages);
    res.status(200).json({ messages });
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};

//SEND MESSAGE LOGIC
export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user?._id;

    console.log("📩 New message request received!");
    console.log("Sender ID:", senderId);
    console.log("Receiver ID:", receiverId);

    if (
      !mongoose.Types.ObjectId.isValid(senderId) ||
      !mongoose.Types.ObjectId.isValid(receiverId)
    ) {
      console.error("❌ Invalid ObjectId format");
      return res.status(400).json({ message: "Invalid sender or receiver ID" });
    }

    let imageUrl = null;
    if (image) {
      console.log("📤 Uploading image to Cloudinary...");
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
      console.log("✅ Image uploaded:", imageUrl);
    }

    const newMessage = new Message({
      senderId: new mongoose.Types.ObjectId(senderId),
      receiverId: new mongoose.Types.ObjectId(receiverId),
      text,
      image: imageUrl,
    });

    await newMessage.save();
    console.log("✅ Message saved:", newMessage);

    //WE ARE GETTING THE RECIVER SOCKET ID
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //IF ONLINE SEND THE MESSAGE TO THE RECIVER SOCKET ID
      console.log("✅ Sending message to receiver:", receiverSocketId);
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    // ✅ Send message correctly
    return res.status(200).json(newMessage);
  } catch (err) {
    console.error("❌ Error saving message:", err);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
};