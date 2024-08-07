const { Router } = require("express");
const router = Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const bodyParser = require("body-parser");
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
const PaymentIntent = require("../../../models/PaymentIntent");

router.post("/", bodyParser.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];

  try {
    const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    const { account, data, type } = event;

    const { object } = data;

    if (type === "checkout.session.completed") {
      await handleSinglePayment(object);
    }

    res.json({ received: true });
  } catch (err) {
    console.log(err);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;

async function handleSinglePayment(object) {
  const { amount_total, payment_intent, id, paid, currency, receipt_url, status, payment_status, customer, mode, subscription, customer_details } = object;
  let paymentIntent;
  paymentIntent = await PaymentIntent.findOne({
    paymentIntentId: payment_intent,
  });
  if (!paymentIntent || !paymentIntent._id) {
    paymentIntent = await PaymentIntent.findOne({ paymentIntentId: id });
  }
  if (paymentIntent && paymentIntent.paymentIntentId) {
    await PaymentIntent.updateOne(
      { paymentIntentId: paymentIntent.paymentIntentId },
      {
        $set: {
          email: customer_details.email,
          paymentStatus: payment_status,
          amountTotal: amount_total,
          customerId: customer,
          status: status,
          id: payment_intent,
          isDevelopment: process.env.NODE_ENV !== "production",
        },
      }
    );

    return;
  }
}
