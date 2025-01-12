const express = require('express');
const { registerUser ,authUser } = require("../controllers/userController");
const router = express.Router(); //CREATE THE INSTENCE OF ROUTER

//WE ARE USING ROUTER IN STED OF GET / PUT ETC BECAUSE WE CAN GIVE THE GET PUT ETC AS PER OUR NEED
  
 
router.route('/').post(registerUser); //WE ARE USING POST BECAUSE WE ARE REGISTERING THE USER THIS IS COMMING FRO THE CONTROLLERE FOLDER
router.post('/login', authUser);//ROUTE FOR LOGIN

module.exports = router; //EXPORTING THE ROUTERlogin