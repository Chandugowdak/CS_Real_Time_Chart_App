const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },       // NAME OF THE USER
    email: { type: "String", unique: true, required: true },//USER EMAIL
    password: { type: "String", required: true },//GET THE PASSWORD
    pic: {
      type: "String",
      
      default:    //THIS EILL BE SET IF THE USER DO NOT GIVE THE IMAGE
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {
      type: Boolean,   
      required: true,
      default: false,
    },
  },
  { timestaps: true }  //GET THE TIME STAMP
);

// THIS IS USED TO COMPAIR THE DATA
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//THIS WILL HASH [ENCRYPT] THE PASSWORD BEFORE SAVING IT TO THE DATABASE
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next(); //MOVE TO NEXT
  }

  const salt = await bcrypt.genSalt(10); //GENERATE THE SALT
  this.password = await bcrypt.hash(this.password, salt);// HASH THE PASSWORD
});

const User = mongoose.model("User", userSchema);

module.exports = User;
