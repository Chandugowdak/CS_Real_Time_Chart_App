const asyncHandler = require('express-async-handler');
const Chart = require("../models/chatModel");
const User = require('../models/userModel');


//ACCESS THE CHART
const accessChart = asyncHandler(async (req, res) => {
  const {userId} = req.body;

  // Validate if userId is provided
  if (!userId) {
    console.log("userId is not defined");
    return res.status(400).send({ message: "userId is required" });
  }

  try {
    // Find if a chat exists between the current user and the provided userId
    var isChart = await Chart.find({
      isGroupChart: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user._id } } }, // Ensure this is _id, not _Id
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    // Populate sender details in the latestMessage
    isChart = await User.populate(isChart, {
      path: "latestMessage.sender",
      select: "name pic email",
    });

    // If a chart exists, return it
    if (isChart.length > 0) {
      return res.send(isChart[0]);
    }

    // Otherwise, create a new chart
    const chartData = {
      chartName: "sender",
      isGroupChart: false,
      users: [req.user._id, userId],
    };

    const createdChart = await Chart.create(chartData);
    const fullChart = await Chart.findOne({ _id: createdChart._id }).populate(
      "users",
      "-password"
    );

    return res.status(200).send(fullChart);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: error.message });
  }
});


//FETCH THE USER CHART ARRAY
const fetchChart = asyncHandler
    (async (req, res) => {
        try {
            
                Chart.find({ users: { $elemMatch: { $eq: req.user._id } } })
                .populate('users', "-password")
                .populate("groupAdmin" , "-password")
                .populate("latestMessage")
                .sort({ updatedAt: -1 }) //SORT THE NEW AND OLD MESSAGE
                .then(async(results) => {
                  results = await User.populate(results, {
                    path: "latestMessage.sender",
                    select: "name pic email",
                  });
                  res.status(200).send(results); //SEND THE RESULT OF THE CHART
                })
        
        }
        catch (err) {
            res.status(400);
            throw new Error(err.message);
            
        }
    
    })

//CREATE THE GROUP CHART
const createGroupChat = asyncHandler(async (req, res) => {
    //IF IT IS THE EMPTY FIELD
    if(!req.body.users || !req.body.name) {
        return res.status(400).send({message: "Please Enter all the fields"})
    }
    var users = JSON.parse(req.body.users);
    //CHECK IF THE GROUP CHART HAS MORE THEN 2 PEOPLE
    if(users.length < 2) {
        return res.status(400).send({ message: "More than 2 users are required to form a group chat" })
        
    }
    //MAKE THE GROUP INCLUDING THE CURRENT USER AND REST
    users.push(req.user);

    try {
        const groupChat = await Chart.create({
            chartName: req.body.name,
            users: users,
            isGroupChart: true,
            groupAdmin: req.user,
        });
        const fullGroupChart = await ChatModel.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password");
        
        res.status(200).json(fullGroupChart);
    }
    catch (erroe) {
        res.status(400);
        throw new Error(erroe.message);
}    
})

//RENAME THE GROUP
const renameGroup = asyncHandler(async (req, res) => {
    
    const { chartId, chartName } = req.body;
    const updatedChart = await Chart.findByIdAndUpdate(chartId, { chartName }, {
        new:true,
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

    if (!updatedChart) {
        res.status(404);
        throw new Error("Chart Not Found");
    } else {
        res.json(updatedChart);
    }
})

//DELETE THE GROUP
const deleteGroup = asyncHandler(async (req, res) => {
    const { chartId , userId } = req.params;
    const removed = await Chart.findByIdAndDelete(chartId,
        {
            $pull: { users: userId },
        },
        {new: true,}
    )
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
    if (!removed) {
        res.status(404);
        throw new Error("Chart Not Found");
    }
    res.json(removed);
    

})

//ADD TO THE GROUP
const addToGroup = asyncHandler(async (req, res) => {
    const { chartId, userId } = req.body;
    const added = await Chart.findByIdAndUpdate(chartId, {
        $push: { users: userId },
    }, {
        new: true,
    })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if (!added) {
        res.status(404);
        throw new Error("Chart Not Found");
    }
    res.json(added);
})

module.exports = {
  accessChart,
  fetchChart,
  createGroupChat,
  renameGroup,
  deleteGroup,
  addToGroup,
};
