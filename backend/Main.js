const express = require("express");
const app = express();
const cors = require("cors");
const Data = require("./data/data");
const dotenv = require("dotenv");

dotenv.config(); //MAKING USE OF THE ENV DATA

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.get("/api/Data", (req, res) => {
  res.json(Data); // Send the Fake_Data
});

// app.get("/api/Data/:id", (req, res) => {
//   const id = req.params.id;
//   const Req_data = J_Data.find((data) => data._id === id);
//   res.send(data);
// });

//CRAETED THE SERVER

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
