const express = require("express");
const router = express.Router();

//import file 
const { processPayment, sendStripeApiKey } = require("../controller/paymentController");
const {isAuthenticatedUser} = require("../middleware/auth")

router.route("/payment/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;        
//is ko app.js me import krna ha