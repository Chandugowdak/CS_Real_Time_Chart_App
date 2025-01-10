const express = require("express");
const app = express();
app.use(express.json());
const J_Data = require("./data/data");
const dotenv = require("dotenv");

dotenv.config(); //MAKING USE OF THE ENV DATA
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

// app.get("/api/J_Data", (req, res) => {
//   res.send(J_Data)
// });

app.get("/api/J_Data/:id", (req, res) => {
  const id = req.params.id;
  const Req_data = J_Data.find((data) => data._id === id);
  res.send(Req_data);
});

//CRAETED THE SERVER

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
