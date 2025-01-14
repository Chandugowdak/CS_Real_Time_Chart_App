// THSI CODE WILL CHECK THE AUTHENTATION OF THE THE USER BEFOR ACCESSING THE NEW ROUTE

const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")

    ) try {
        token = req.headers.authorization.split(" ")[1]; // THIS IS USED TO DECODE THE TOCKEN
        const decoded = jwt.verify(token, process.env.JWT_SECRET); //VARIFY THE TOCKEN
        req.user = await User.findById(decoded.id).select("-password"); //THIS IS USED TO  FIND THE USER IN THE DATA BASE AND SEND WITHOUT THE PASSWORD
        next();
        }
    catch (err) {
        res.status(401);
        throw new Error("Not authorized, token failed");
        }
    if (!token){
        res.status(401);
        throw new Error("Not authorized, no token");
    }
})


module.exports = { protect };