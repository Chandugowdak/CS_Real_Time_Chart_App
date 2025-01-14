const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  accessChart,
  fetchChart,
  createGroupChat,
  renameGroup,
  deleteGroup,
  addToGroup,
} = require("../controllers/chartControllers");

const router = express.Router();

router.route("/").post(protect, accessChart); //SEND THE CHART DATA TO THE FRONT END
router.route('/').get(protect, fetchChart);// GET THE CHART DATA FROM THE FRONT END

 router.route("/group").post(protect, createGroupChat);//CRAETE THE GROUP CHART
router.route('/rename').put(protect, renameGroup);//RENAME THE GROUP CHART
 router.route('/groupremove').put(protect, deleteGroup);//DELETE THE GROUP CHART
 router.route('/groupadd').put(protect, addToGroup);//ADD THE CHART TO THE GROUP CHART

module.exports = router;
