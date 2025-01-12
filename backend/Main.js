const express = require("express");
const app = express();
const cors = require("cors");
const Data = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware"); //IMPORTING THE ERROR HANDLERS
const userRoutes = require("./routes/userRoutes"); //IMPORT THR ROUTES FROM THE ROUTES FOLDER
app.use(express.json()); //THIS IS USD TO GET THE DATA FROM FRONT END AS JSON

dotenv.config(); //MAKING USE OF THE ENV DATA

connectDB(); //CALLING THE DATA BASE CONNECTION

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/api/Data", (req, res) => {
  res.json(Data); // Send the Fake_Data
});

app.use("/api/user", userRoutes); // THIS IS FOR THE REGISTRATION FORM

//THIS ARE THE TWO ERROR HANDLING FUNCTION
app.use(notFound);
app.use(errorHandler);

//CRAETED THE SERVER

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
