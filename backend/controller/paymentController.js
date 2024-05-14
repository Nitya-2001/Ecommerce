const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
console.log(stripe + "jojo");
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
  console.log("d");

  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Ecommerce",
    },
    description: "Description of your export transaction goes here.",
    shipping: req.body.shipping, // Use the shipping data sent from the frontend
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  console.log(stripe);
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
