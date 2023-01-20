//create a class -- 1st Letter is capital--- ErrorHandler ka inheritances bania ha Error ko 

class ErrorHandler extends Error {

    constructor(message, statusCode) {
        //error ka method ha ye sb --or ye constructor ko nechy call ki ha
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor)

    }


}

// is file ko middleware me used kia h
module.exports = ErrorHandler
