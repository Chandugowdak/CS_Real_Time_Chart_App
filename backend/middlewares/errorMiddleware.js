const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}}`);
    res.status(404);
    next(error); // TO MOVE TO THE NEXT MIDDLEWARE
}

// ERROR HANDLER
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // IF THE STATUS CODE IS 200 THEN CHANGE IT TO 500
    res.status(statusCode); // TO SET THE STATUS CODE
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === "production" ? null : err.stack, // TO SHOW THE STACK TRACE ONLY IN DEVELOPMENT MODE
    });
};

module.exports = {notFound , errorHandler};