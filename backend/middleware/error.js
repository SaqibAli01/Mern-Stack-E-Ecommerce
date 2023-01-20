// ErrorHandler ki file ko import kia ha me ny

const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";



    //Wrong mongoDb Id Error ...error name CastError Error No.3

    if (err.name === "CastError") {
        const message = `Resource is not Found!. Invalid ${err.path}`;
        err = new ErrorHandler(message, 400);
    }


    //Mongoose duplicate key Error.. codeError 11000
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }



    //Wrong JWT error
    if (err.name === "jsonWebTokenError") {
        const message = `Json web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }


    //Wrong JWT error
    if (err.name === "jTokenExpireError") {
        const message = `Json web Token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,

        //error.stack sy ham ko error k shat us error ki location ka be pata chal jy ga
        // error: err.stack,
        // message: err.stack,

        // method 2 // ye jo message dia ha ye productController ki file me product not found ka ha 
        // message: err.stack,

    });
};

// is ko ham ab app.js me import kr gy ja k