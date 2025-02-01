// THIS IS UDED TO GET THE CHART

import Message from "../middleware/messageAuth.js";

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
        //THIS REFERS TO WE ARE RENAMING ID TO USERTOCHATID
        const { id: userToChatId } = req.params;
        const myId = req.user._id;
 //THIS IS USED TO FIND ALL THE MESSAGE WHERE SENDER IS ME OR ULTA
        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                {senderId: userToChatId, receiverId: myId }
            ]
        })
        //SEND THE CHAT DATA
        res.status(200).json({ messages })

    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

//SEND MESSAGE LOGIC
export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        
        let imageUrl;
        //IF THERE IS AN IMAGE WE WILL UPLOAD TO CLOUDINARY
        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
                
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = await Message.create({
            
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        //TO BE ADDED IN FUTURE
        res.status(200).json({newMessage });


     }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}