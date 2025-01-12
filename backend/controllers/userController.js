const asyncHandler = require("express-async-handler");
//THIS ASYNCHANDLER IS A PACKAGE INSTALLED WE WILL USE THIS FOR THE HANDLING OF ERRORS IN THE ROUTES
const User = require("../models/userModel");
const  generateToken = require("../config/generateToken");


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, pic } = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter all the Feilds");
    }

    //THIS WILL CHECK WEATHER IS ALREADY REGISTERED OR NOT
    const userExists = await User.findOne({ email });
    if(userExists){  //THIS IS BECAUSE IF THE USER EMAIL IS ALREADY EXIST
        res.status(400);
        throw new Error("User already exists");
    }

//IF THE USER IS NOT EXIST THEN IT WILL CREATE A NEW USER
    const user = await User.create({
        name, email, password, pic
    });

    if(user){
        res.status(201).json({  //201 MEANS SUCCESSFULLY CREATED
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            tocken: generateToken(user._id) //THIS IS FOR THE AUTHENTICATION PURPOSE BY USING JWT TOCKEN
            
        });
    } else {  //THIS BLOCK WILL EXICUTE IF THE USER IS NOT CREATED
        res.status(400);
        throw new Error("Failed To Craete the User")
    }
    


});

     //THIS IS FOR THE LOGIN DATA
    const authUser = asyncHandler(async (req, res) => {
        const { email, password } = req.body;
        //CHECK WEATHER THE USER IS EXIST OR NOT
        const user = await User.findOne({ email });
// IF THE USER PRESENT THEN IT WILL CHECK THE PASSWORD
        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                pic: user.pic,
                tocken: generateToken(user._id)
            });

        } else {
            //IT THE PASSWORD IS WRONG
            res.status(401);
            throw new Error("Invalid Email or Password")
        }
    
})

//EXPORT THIS MODULES
module.exports = { registerUser, authUser };