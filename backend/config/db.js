//THIS FILE IS USED FOR THE CONNECTION OF THE DATABASE
const mongoose = require("mongoose");

const connectDB = async () => {
    
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
          
            //THERE IS AN ERROR SO I HAVE NOT GIVEN THE PARAMETERS
            //I FUTURE I HAVE TO CLEAR IT 
            
        })
        console.log(`MongoDB Connected: ${conn.connection.host}`) //THIS WILL SHOW THE HOST NAME OF THE DATABASE WE ARE CONNECTING TO
    } catch (err) {
        console.log(err);
        process.exit(1);  //THIS WILL EXIT THE PROCESS WITH A FAILURE
    }
}
module.exports = connectDB; //WE ARE EXPORTING THE CONNECTDB FUNCTION