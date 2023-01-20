// <------------------------------------import Files ------------------------------------------>

// folder create no 2 // app ki file ko get kia ha me 
const app = require('./app');
const cloudinary = require('cloudinary');

//process.env.PORT is port ki value 4000 ay gi config.env file me .. or env file ko get kia ha me ny
const dotenv = require('dotenv');

// database ko yaha get ki ha
const connectDatabase = require("./config/database");

//config.env file ko get kia
dotenv.config({ path: 'backend/config/config.env' });
// <------------------------------------End import Files---------------------------------------->





// <------------------------------------Handling Uncaught Exception----------------------------->
//(Error No.2) error is thra ka hota ..for exp: ham ny console me asy lheka [ console.log(saqib) ]..  
process.on('uncaughtException', (err) => {


    console.log(`-----------------------------Handling Uncaught Exception----------------------`);
    console.log(` Error : ${err.message}`);
    console.log(`Shutting down the server due to  Uncaught Exception`);
    console.log(`------------------------------------------------------------------------------`);

    process.exit(1);

})

//ye error ko handel kia ha ///                  Error : ReferenceError: saqib is not defined
// console.log(saqib);

// <------------------------------------End Handling Uncaught Exception------------------------->


// <------------------------------------connect to database ------------------------------------>
// connect to database function ko call ki ha me ny
connectDatabase()

// <------------------------------------end connect to database -------------------------------->
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


// <-------------------------------Server Unhandled Promise Rejection---------------------------->

const server = app.listen(process.env.PORT, () => {
    console.log(`--------------------------------------------------------------`);
    console.log(`Saqib> Server is working on http//localhost:${process.env.PORT}`)
    console.log(`--------------------------------------------------------------`);

});


//agr hamra server me koe error a jy to us ko handle krna ha .. Error No.1
process.on("unhandledRejection", (err) => {
    console.log(`--------------------Unhandled Promise Rejection-----------------------------`);
    console.log(`Server Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
    console.log(`-----------------------------------------------------------------------------`);

    //agr ye error a jy to server ko close kr dna ha phir
    server.close(() => {
        process.exit(1)
    });

})

// <----------------------------End Server Unhandled Promise Rejection------------------------------->
