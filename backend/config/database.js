const mongoose = require('mongoose');



//create a function 

const connectDatabase = () => {
    // const db = `mongodb://localhost:27017/Ecommerce`; 
    const db = process.env.DB_URI;

    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true 
    }).then((data) => {
        console.log(`-----------------------------------------------------------------------------`);
        console.log(`Saqib> MongoDB Connected with server ${data.connection.host}`);
        console.log(`-----------------------------------------------------------------------------`);

    });

    //catch is lia ab used  ni kia ha q k  server wali file (Server Unhandled Promise Rejection ) ham laga dia ha
    // .catch((err) => {
    //     console.log(`Error! Connecting to MongoDB ----- ${err}`);
    // });

}

//export function // is ko ab server me ja k get kr ly gy
module.exports = connectDatabase