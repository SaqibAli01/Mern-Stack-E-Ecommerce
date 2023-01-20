const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

//forget password krny k lia ye used krty ha ==> const crypto = require("crypto");


//select:false is ka matlib password ko chor ka sb kuch mil jy ga
//avatar ye profile file ha
//role : me ham baty gy Amin ha ya user ha default : "user", jb tk admin ni bny gy wo user he rhy ga
// const bcrypt = require("bcryptjs"); password ko bcrypt krny k lia used kry gy

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name Should have more then 4 Characters"]
    },

    email: {
        type: String,
        require: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
    },
    role: {
        type: String,
        default: "user",
    },
    createdAt : {
        type: Date,
        default: Date.now,
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,


});

//--------UserSchema save hony sy phlay password bcrypt me  save ho jy.....
//save sy userScchema save ho jy ga
//Me ny ider Arrow function is lia nhi bania ha k me ny this used krna ha arrow fun me this use ni kr skty ha ham
// this password , 10 strong ho ga asy lehkny sy
//if condition me password ko hash ni kry gy q k wo already phly sy hash hoa ha 

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        //agr already password hash ho ye conditon ni chly gi..next() ko call kr di
        next();
    }
    this.password = await bcrypt.hash(this.password, 10)
});
//---------------End bcrypt password--------------------------




//--------------------jwt token--------------------------

// JWT_SECRET or JWT_EXPIRE in 2no config file me call kr di ha
// JWT_SECRET= ye ak screate key bany gy koe be
// JWT_EXPIRE= 5 din expire ho jy ga
// ye method ban gia ab is ko userController.js  call kr dia me ny

userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        //USER LOGIN KRY to wo 2 din bad logout ho jy  token ko expire kr dna ha me ny
        expiresIn: process.env.JWT_EXPIRE,
    });


};



//--------------------Compare Password--------------------------

userSchema.methods.comparePassword = async function (enterPassword) {

    //this.password database sy ay ga jo ham ny hash kia ha password ko or return true ya false kr dy ga ye
    return await bcrypt.compare(enterPassword, this.password);
};


//--------------------forget Password--------------------------
// getResetPasswordToken userController me lhenka 
//Generating password and Reset Token
userSchema.methods.getResetPasswordToken = function () {

    //Generating Token or resetToken ko email k thro bhajy gy ham
    const resetToken = crypto.randomBytes(20).toString("hex");


    //Hashing and adding  resetPasswordToken to ....    //resetPasswordToken opr schema me bania ha
    //ab userSchema me oper ye new token save ho jy ga

    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");


    //resetPasswordExpire  ..ye 15 din me expire ho jy ga
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    //resetToken email k throw passwrod rest krwy gy ham
    return resetToken;
};



//--------------------export--------------------------
// export krna ha... (User) Database kaName ..  --- is ko file ko userController.js me import kia ha  me ny
module.exports = mongoose.model("User", userSchema);