const express = require("express");

const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");
const {
  sendStripeApiKey,
  processPayment,
} = require("../controller/paymentController");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
console.log("app4");
router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
