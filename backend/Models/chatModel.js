const mongoose = require("mongoose");

const chatModel = mongoose.Schema(
  {
    chatName: { type: String, trim: true }, //NAME OF CHART
    isGroupChat: { type: Boolean, default: false }, //WEATHER IT IS GROUP OR SINGLE
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  //WE USE ARRAY BECAUSE SINGLE OR MULTI USER
    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,   //LIST OF MESSAGES CAME FIRST
      ref: "Message", //REFERENCE WHERE THE MESSAGE IS STORE 
    },
    groupAdmin: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //NAMME OF THE GEOUP ADMIN AND REFERENCE FROM THE USER FILE
  },
  { timestamps: true }   //MAINTAIN THE TIMESTAMP MEANS NEW MESSAGE COMES THE TIME WILL COME
);

const Chat = mongoose.model("Chat", chatModel);  //CREATING THR MODEL IN MONGO DB

module.exports = Chat;  //EXPORT THE CHAT MODEL
