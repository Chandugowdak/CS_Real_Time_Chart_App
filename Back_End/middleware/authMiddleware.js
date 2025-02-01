//WE ARE USING COOKI-PARSER TO GRAB THE COOKIES FROM THE REQUEST
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const protectRoute = async (req, res, next) => {
  try {
    //THIS WILL TAKE THE JWT TOKEN FROM THE COOKIE
    const token = req.cookies.jwt;
    //IF THERE IS NOR TOKEN THEN IT WILL SHOW THE ERROR
    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }
    //VERIFY THE TOKEN FROM OUR SECRET KEY
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //IF THE TOKEN IS NOT VALID THEN IT WILL SHOW THE ERROR
    if (!decoded) {
      return res.status(401).json({ message: "Token is In Valied" });
    }

    //IF EVERYTHING IS OK THEN IT WILL RETURN THE USER AND SAAY NOT TO SHOW THE PASSWORD
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }
    //THIS SAY IF THE USER IS APPROVED THEN IT WILL GO TO THE NEXT ROUTE
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};
