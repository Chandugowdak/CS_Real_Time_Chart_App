const jwt = require('jsonwebtoken'); //THIS IS USED TO GENERATE TOKENS FOR THE AUTHINTATION PURPOSE AND THIS WILL BE ENCRYPTING THE DATA


//THIS FUNCTION IS USED TO GENERATE TOKENS FOR THE AUTHINTATION PURPOSE
const generateToken = (id) => { //WE ARE PASSING ID AS A PARAMETER
    return jwt.sign({ id }, process.env.JWT_SECRET, {   //WE USE JWT_SECRET THAT WE HAVE GIVEN IN THE ENV FILE
        expiresIn: '30d',  //WE ARE GIVING THE EXPIRY TIME FOR THE TOKEN
    });
}

module.exports = generateToken; //WE ARE EXPORTING THE FUNCTION