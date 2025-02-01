//HASH PASSWORD USING BCRYPT
import cloudinary from "../lib/cloudinary.js";
import { generateTocken } from "../lib/utils.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";


//LOGIC FOR THE SIGN UP PAGE
export const signup = async(req, res) => {
  const { fullName, email, password } = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" })
        }
        if (password.length < 6) {
          return res.status(400).json({message:"Password must be at least 6 characters long"})
        }
        //IF THE PASSWORD LEN IS GREATER RTHAN 6
        const user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });


        //THIS GENERATES THE SALT
        const salt = await bcrypt.genSalt(10);
        //HASH THE PASSWORD
        const hashedPassword = await bcrypt.hash(password, salt);
 //IF THE USER DATA PRESENT
        const newuser = new User({
          fullName,
          email,
          password: hashedPassword,
        })

        if (newuser) {
//THIS WILL GENERATE THE TOCKEN
            generateTocken(newuser._id, res); 
            await newuser.save();
            res.status(201).json({
                _id: newuser._id,
                fullName: newuser.fullName,
                email: newuser.email,
                profilePic : newuser.profilePic,


             });


        }
        else {
            res.status(400).json({ message: "Invalid user data" });
        }


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });

  }
};

//LOGIC FOR LOGIN
export const login = async(req, res) => {
    const { email, password } = req.body;
    try { 
        const user = await User.findOne({ email });
        //IF NO USER DATA
        if (!user) {
            return res.status(400).json({ message: "Invalid DATA" });
        }
        //IF USER DATA PRESENT
        const isPasswordCorrect = await bcrypt.compare(password, user.password)
        if(!isPasswordCorrect){
            return res.status(400).json({ message: "Invalid DATA" });
        }
        //THIS WILL GENERATE THE TOCKEN
        generateTocken(user._id, res);
        res.status(200).json({ 
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilePic : user.profilePic,

         });

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
        
    }
};

//LOGOUT LOGIC
export const logout = (req, res) => {
    try { 
        //THIS WILL CLEAR THE JWT TOKEN IF THE USER LOGOUT
        res.cookie("jwt", "", { maxAge: 0 })
        res.status(200).json({ message: "Logout Successfully" });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }

};

//LOGIC FRO THE UPDATE THE PROFILE
export const updateProfile = async (req, res) => {
    try {

        const { profilePic } = req.body;
        const user = req.user._id;
        if(!profilePic){
            return res.status(400).json({ message: "Invalid DATA" });
        }
        //THIS WILL UPDATE THE PROFILE PIC
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
          
            
        const updatedUser = await User.findByIdAndUpdate(user, { profilePic: uploadResponse.secure_url }, { new: true });
        res.status(200).json(updatedUser);
        
     }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
    
};


//LOGIC TO GET THE DATA
export const checkAuth = async (req, res) => {
    
    try { 
        res.status(200).json(req.user);
        
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Something went wrong" });
    }
}
