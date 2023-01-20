const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
const bodyParser= require("body-parser");
//---------------------------------------------------------------------
const dotenv = require('dotenv');
//config.env file ko get kia
dotenv.config({ path: 'backend/config/config.env' });
//---------------------------------------------------------------------


//-----------ye register krny k lia     is sy image upload ho gi
const fileUpload = require("express-fileupload");

// <---------------------------------------------------middleware ko import kis ha---------------------------------------------->

const errorMiddleware = require('./middleware/error');

//<-------------------------------------------------------------End middleware ------------------------------------------------>


// <------------------------------------------------------------------------------------Routes Import ----------------------------------------------------------->
//(app.use(express.json())) api used krny sy phaly ye used lazmi kry gy
// cookieParser 

app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

// <--------------------------------product Routes ko import kis ha------------------------------>
//routes file ko get kia ha no 1...//url:http://localhost:4000/api/v1/products ...

const product = require('./routes/productRoute');
app.use('/api/v1', product);

// <--------------------------------user Routes ko import kis ha--------------------------------->
const userRoutes = require('./routes/userRoute');
app.use('/api/v1/', userRoutes);


// <--------------------------------order Routes ko import kis ha--------------------------------->

const order = require("./routes/orderRoute");
app.use('/api/v1/', order);

// <--------------------------------payment Routes ko import kis ha--------------------------------->

const payment = require("./routes/paymentRoute");
app.use('/api/v1/', payment);


// <------------------------------------------------------------------------------End Routes Import ----------------------------------------------------------->






// <--------------------------------------------------------------Middleware  call ki ha ------------------------------------------->
// middleware ki file yaha get kia ha

app.use(errorMiddleware);

module.exports = app