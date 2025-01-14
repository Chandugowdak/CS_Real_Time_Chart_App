const express = require('express');
const { registerUser ,authUser,allUsers } = require("../controllers/userController");
const router = express.Router(); //CREATE THE INSTENCE OF ROUTER
const { protect}  = require("../middlewares/authMiddleware");

//WE ARE USING ROUTER IN STED OF GET / PUT ETC BECAUSE WE CAN GIVE THE GET PUT ETC AS PER OUR NEED
  
 //WE USE / AS COMMON AND ADD ROUTE FOR BOTH REG AND THE ALLUSERS
router.route("/").post(registerUser).get(protect,allUsers); //WE ARE USING POST BECAUSE WE ARE REGISTERING THE USER THIS IS COMMING FRO THE CONTROLLERE FOLDER
router.post('/login', authUser);//ROUTE FOR LOGIN


module.exports = router; //EXPORTING THE ROUTERlogin