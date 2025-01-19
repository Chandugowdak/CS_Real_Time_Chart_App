const express = require("express");
const app = express();
const cors = require("cors");
const Data = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); //IMPORTING THE DATABASE CONNECTION
const { notFound, errorHandler } = require("./middlewares/errorMiddleware"); //IMPORTING THE ERROR HANDLERS
const userRoutes = require("./routes/userRoutes"); //IMPORT THR ROUTES FROM THE ROUTES FOLDER
const chartRoutes = require("./routes/chartRoutes"); //IMPORT THR ROUTES FROM THE ROUTES FOLDER


//app.use("/api/chat", chartRoutes); //USING THE CHART ROUTES
app.use(express.json()); //THIS IS USD TO GET THE DATA FROM FRONT END AS JSON


dotenv.config(); //MAKING USE OF THE ENV DATA

connectDB(); //CALLING THE DATA BASE CONNECTION



app.use(express.json());
app.use(cors());


const port = process.env.PORT || 5000;


app.get('/api/Data', (req, res) => {
  res.json(Data); // Send the Fake_Data
});


app.use("/api/user", userRoutes); //USING THE USER ROUTES
app.use('/api/chart',chartRoutes); // THIS IS FOR THE CHART DATA

//THIS ARE THE TWO ERROR HANDLING FUNCTION 
app.use(notFound);
app.use(errorHandler);


//CRAETED THE SERVER

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
