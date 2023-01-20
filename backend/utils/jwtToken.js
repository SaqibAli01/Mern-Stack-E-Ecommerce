//is file ko ham controllers k folder k under userController me used kry gy
//is sy ham ak jga apa ak token gentrate kr ly gy or is ko her jga call kr ly gy

//create token and savin gi n cookie

const sendToken = (user, statusCode, res) => {
    const token = user.getJWTToken();

    //option for cookie
    const options = {
        expires: new Date(
            //ye  2 din bad expire ho jy ga COOKIE_EXPIRE =  2DAY , 24 = 1 Hours , 60 = 1 Mints =60 = 1 Second = 1000 = MileSeconds, 

            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        user,
        token,
    });

}


//export is ko import ham userController me ja k kry gy
module.exports = sendToken;