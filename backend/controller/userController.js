// <----------------------------------------------Import Files-------------------------------->

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middleware/catchAsyncError');
const User = require("../model/userModel");
const sendToken = require('../utils/jwtToken');
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
// const { send } = require('process');

//image upload krny k lia 
const cloudinary = require("cloudinary")


// <---------------------------------------------End Import Files------------------------------->


// <---------------------------------------------Register a User-------------------------------->

exports.registerUser = catchAsyncError(async (req, res, next) => {
    
    //image upload krny k lia
    const myCloud =await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatars",
        width: 150,
        crop: "scale", 
    });
    
    const { name, email, password } = req.body;

    const user = await User.create({
        //name , email , password ko opr me ny get kr lia ha
        name,
        email,
        password,
        //ye photo upload krny k used kry gy
       
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    });
    // avatar: {
    //     public_id: " this is a sample id",
    //     url: "Profile Pic Url"
    // },

    //-------------jwt token method One---------------
    //  // JWT TOKEN ko yaha import kr k call kia ha
    //  const token = user.getJWTToken();
    //  console.log("token" ,token)

    //  // is ka res sy hamra user ban jy ga
    //  res.status(201).json({
    //      success: true,
    //     //  user,
    //      token,
    //  });



    //-------------jwt token method two---------------
    //me ny is ko ak lag file bana k use me rhak dia ha
    //user or statusCode = 200 or res
    sendToken(user, 201, res);



});



// <-------------------------------------------End Register a User------------------------------>


// <------------------------------------------------Login a User------------------------------>
//is ko user model me ja k import kry gy..
//loginUser ko routes me ja k get krna ha


exports.loginUser = catchAsyncError(async (req, res, next) => {
    //checking if user has given password and email both
    //select("+password") is lheka ha pechy isko false kia ha 
    const { email, password } = req.body;
    if (!email || !password) {
        console.log("email or password invalid")
        return next(new ErrorHandler("Please Enter Email & Password", 404));
    }

    const user = await User.findOne({ email }).select("+password")
    //agr user ni mila 
    if (!user) {
        return next(new ErrorHandler("Invalid Email & Password", 404));
    }

    //opr sy jo password aia ha wo is ko dy gy
    const isPasswordMatched = await user.comparePassword(password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email & Password", 404));
    }

    //-------------jwt token method One---------------
    //  // JWT TOKEN ko yaha import kr k call kia ha
    //  const token = user.getJWTToken();
    //  console.log("token" ,token)

    //  // is ka res sy hamra user ban jy ga
    //  res.status(201).json({
    //      success: true,
    //     //  user,
    //      token,
    //  });



    //-------------jwt token method two---------------
    //user or statusCode = 200 or res
    sendToken(user, 200, res);


});

//-------------jwt token method two---------------




// <-----------------------------------------------End Login a User------------------------------>

// <---------------------------------------------User Logout-------------------------------->
//logout User ko ab routes me ja k route dna ha // logout ko import krna ha route me 

exports.logout = catchAsyncError(async (req, res, next) => {

    //res.cookie me id ay gi 
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })


    res.status(200).json({
        success: true,
        message: "Logout SuccessFull"
    })
});


// <---------------------------------------------End User Logout--------------------------->



// <------------------------------------------------Forget Password ----------------------------------->
//forgetPassword  ko ab routes me ja k route dna ha // logout ko import krna ha route me 

exports.forgotPassword = catchAsyncError(async (req, res, next) => {

    //forgot password krny k lia koe na koe email to chahia is lia email find ki ha
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    // Get ResetPassword Token ... ye model folder k under userModel,js file  me  userSchema getResetPasswordToken  lheka ha
    const resetToken = user.getResetPasswordToken();

    //oper jo user bania ha wo kuch retun kr raha ha us ko save kia ha..ham ko new password mil gia ab is ko save kr lia ha
    await user.save({ validateBeforeSave: false });


    //email pr request bhaj ny k lia
    //ye link localhost k lia
    // const resetPasswordUrl = `http://localhost/api/v1/password/reset/${resetToken}` 
    // :-\n\n ye linebreak k lia ha . te 2 line chor kr nechy a jy ga
    //ye link method two ha
    //sendEmail wala function upr import kia ha utils sendEmail.js file me sy
    // ye message email ko bhajy gy 

    //BACKEND ME   post men api me chalny k lia 
    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;


    //is me host 8000 pr ha or ham front-end 3000 pr chala rhy ha
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

    const message = `Your password reset token is :-\n\n ${resetPasswordUrl} If you have not requested this email then,
     please ignore it `;


    //msg send kia email me
    try {
        await sendEmail({
            email: user.email,
            subject: `E-Commerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email send to ${user.email} successfully`,
        });

    } catch (error) {
        // resetPasswordToken or resetPasswordExpire ye 2no me ny database me save krwa dia tha .. agr error a jy to in ko undefined kr dna ha
        //undefined krny k bad save kia ha
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});


// -------------------------- Reset Password Step 1------------------------------------------

//forgot password kr lia ha opr  email me be send kr dia ha.. ab forgot krny k bad save krwna ha
//ye link email pr jta ha
// http://localhost:3000/api/v1/password/reset/5aa09203a62e74ceca972ff408c989b7f4e632ef
//crypto is ko opr import be krna ha
//ye link k shat jo token ha is ko get krna ha

exports.resetPassword = catchAsyncError(async (req, res, next) => {

    //creating a token Hash
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");


    //resetPasswordToken ko token sy find krna ha 
    //resetPasswordExpire $gt > greateThen data sy ho 
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    //agr user ni mila to
    if (!user) {
        return next(new ErrorHandler(`Reset Password Token is invalid or has been expired`, 400));
    }

    //password or confirm password 2no equal na hon

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not Match  Password", 400));
    }

    //ab user ka password change kr dy gy.successfully change password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    sendToken(user, 200, res);
});


//step 2 me restPassword ko route me add kr dy 


//----------------Get Users Details ---------Start Codding------------

//find by ID .... ye routes wo he access kr skta ha..jo login ha...
//jb ham login krty ha to auth.js me req.user = me pura user save krwia  tha
//getUserDetails ko import routes me ja k krna ha


exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });

});
//-----------------------------------------------------------------------------------------------------


//----------------Update Users Password ---------------------

//find by ID .... ye routes wo he access kr skta ha..jo login ha.
//jb ham login krty ha to auth.js me req.user = me pura user save krwia  th//User Password ko update kia ha.. exter used .select("+password");
//updatePassword ko import routes me ja k krna ha

exports.updatePassword = catchAsyncError(async (req, res, next) => {
    
    const user = await User.findById(req.user.id).select("+password");

    //.... idr old password dna ha ... ////postmen me oldPasswordlheky g
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect ", 400));
    }

    //postmen me newPassword lheky gy ////postmen me confirmPassword lheky gy
    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password dose not match ", 400));
    }

    //agr 2no password match ha to phir asy kry gy --> //confirmPassword = newPassword ye 2no ak he ha -->//postmen me newPassword lheky gy
    user.password = req.body.newPassword;
    await user.save();
    sendToken(user, 200, res);

});


//----------------Update Users Profile  ---------------------

exports.updateUserProfile = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    if (!req.body.name) {
        return next(new ErrorHandler("Kindly  Enter Your Name ", 400));
    }

    if (!req.body.email) {
        return next(new ErrorHandler("Kindly  Enter Your Email ", 400));
    }
    if (!req.body.email && !req.body.name) {
        return next(new ErrorHandler("Kindly  Enter Your Name & Email ", 400));
    }


    //avatar ko bad me cloud me sy update kry gy...destroy ka matltib delete krna ha or is sy old pic del ho jy or new add ho jy gi
    //condition lagi empty na ho to .. or user ki id find ki or id sy old img li or old img ko del kia or new img ko cloud me save kia 
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }




    //My Database Name (User) hai..req.user.id ye login user ki id ay gi ...... or is me id find krni ha

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    //ye update ho jy ga
    res.status(200).json({
        success: true,
        message: "Update Successfully"
    });



})

//-------------------Get All User Admin----------------------------
//agr admin ny sb user ko dhkna ho to asy dhky ga

exports.getAllUser = catchAsyncError(async (req, res, next) => {

    //is users sari array show ho gi users ki ..ye database sy find ki ha(User.find();)
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    });

});

//---------------- Get Single User Details admin -----------

exports.getSingleUser = catchAsyncError(async (req, res, next) => {

    //is single user ko find kry gy ..ye database sy find ki ha(findById(req.params.id);)
    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User Does not exist with ID : ${req.params.id}`));
    }
    res.status(200).json({
        success: true,
        user,
    });

});

//----------------Update Users role --Admin  ---------------------
//admin kise ko be admin bana skta ha us k roles ko change kr skta ha

exports.updateUserRole = catchAsyncError(async (req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    };

    if (!req.body.role) {
        return next(new ErrorHandler("Kindly  Enter Your role ", 400));
    }


    //My Database Name (User) hai..req.user.id ye login user ki id ay gi ...... or is me id find krni ha

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    //ye update ho jy ga
    res.status(200).json({
        success: true,
        message: "Update User Role Successfully"
    });

})
//----------------End  Update Users role --Admin  ---------------------




//----------------Delete User  --Admin  ---------------------
//admin ksi ko be delete kr skta ha
//My Database Name (User) hai..req.user.id ye login user ki id ay gi ...... or is me id find krni ha

exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);
    if (!user) {
        return next(new ErrorHandler(`User Does Not Exist with Id: ${req.params.id}`));
    }
    // we will remove cloudinary later

    // user ko remove kia 
    await user.remove();

    //ye update ho k remove ho  jy ga
    res.status(200).json({
        success: true,
        message: "Delete User  Successfully"
    });

})