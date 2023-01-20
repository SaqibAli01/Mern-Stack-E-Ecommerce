// is file ko me ny userController.js me import kia ha 
// ye userController me sy options ay ha
// email: user.email,
//             subject: `E-commerce Password Recovery`,
//             message,
//ye nechy , email, subject, or message dia ha
//ye orignal email me jy ga token password 
//SMTP - Simple Mail Transfer Protocol

const nodeMailer = require("nodemailer");


const sendEmail = async (options) => {

    const transporter = nodeMailer.createTransport({
        // service: "gmail" user:"", pass: "SaqibAli"
        // service:"gmail", 
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,



        },
    });
    // console.log("process.env.SMPT_MAIL", process.env.SMPT_MAIL);
    // console.log("process.env.SMPT_PASSWORD", process.env.SMPT_PASSWORD);

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    await transporter.sendMail(mailOptions);

};

module.exports = sendEmail;