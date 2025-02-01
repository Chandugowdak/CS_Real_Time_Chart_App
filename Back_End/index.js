import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { connectDB } from './lib/db.js';
import authRoutes from "./routes/auth.js";
import messageRoutes from "./routes/message.js";



const app = express(); //   CREATING AN INSTANCE OF THE EXPRESS
app.use(express.json()); // USING THE MIDDLEWARE
app.use(cookieParser()); // USING TO PARSE THE COOKIES
app.use(cors(
    {
        origin: "http://localhost:5173",
        credentials: true,
    }
));      // USING THE MIDDLEWARE

dotenv.config(); // IMPORTING FROM THE DOTENV FILE
const Port = process.env.Port || 5000;//IMPORTING FROM THE DOTENV FILE



app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);



app.listen(Port, () => {
    console.log(`Server is Running in The Portel ${Port}`);
    connectDB(); //FUNCTION TO CONNECT TO THE DATABASE
})

