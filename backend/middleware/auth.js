
//middleware folder me auth.js  ki ak file bani ha ye is li auth.js ko bania jo user login ho wo he bas product ko access kr sky 
//is file ko used krny k lia app.js me require krna ho ga
//isAuthenticatedUser ko all product yaha pr show hoti ha pr used krna ha


//----------------import file-------------

const jwt = require("jsonwebtoken");
const userModel = require("../model/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");
const User = require('../model/userModel');


//isAuthenticatedUser is lia bania ha k login ha ya ni ha 

exports.isAuthenticatedUser = catchAsyncError(async (req, res, next) => {

    //jb ham login krty use time cookie ko store kr lia ha cookie ko 
    // const token = req.cookies; //method 1
    // console.log("------------------cookies----------------");
    // console.log("Cookie New:", token);
    // console.log("------------------cookies----------------");

    const { token } = req.cookies;
    if (!token) {
        next(new ErrorHandler("Please Login to Access this Resource", 401))
    };

    //is me opr wala token dia or env ka screet dia .
    const deCodedData = jwt.verify(token, process.env.JWT_SECRET);

    //jwt token jb bania tha us me id di this is lia is me id lheka ha or jwt me sy id ko get kr ly gy
    // req.user me sy kabi be user ka data access kr skty ha q k ham ny is save krwa dia ha

    req.user = await User.findById(deCodedData.id);

    //callback function 
    next();
});

//----------authorizeRoles("admin")---------------------
//...roles sy admin access ho jy ga productRoutes wali file me sy
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {

        // req.user  is me user ka pura data save kr lia tha opr 
        //req.user.role = user is me admin ay ga or includes ak array ka method ha or roles.includes me admin jy ga ye condition true ho gi or ham ny is ko false kr dia 

        if (!roles.includes(req.user.role)) {
            return next(new ErrorHandler(
                `Role : ${req.user.role} is not allowed to access this  resource`, 403
            ))
        }

        //agr admin ha to next ko call ho jy
        next()
    }
};
