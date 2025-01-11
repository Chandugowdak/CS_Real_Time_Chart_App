const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(   //THIS IS FOR THE MESSAGE MODEL
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, //STORE THE SENDER DATA OR THE ID
    content: { type: String, trim: true }, //STORE THE MESSAGE CONTENT
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" }, //STORE THE CHAT ID
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], //STORE THE READ BY ID 
  },
  { timestamps: true } //STORE THE TIME STAMP
);

const Message = mongoose.model("Message", messageSchema); 
module.exports = Message; //EXPORT THE MESSAGE MODEL 
