const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PaymentIntent = require("../../models/PaymentIntent");

router.post("/create-checkout-session", async (req, res) => {
  try {

    const paymentIntents = await PaymentIntent.find({ paymentStatus: 'paid' }, { _id: 1})
    const salesCount = paymentIntents.length;

    const transactionId = uuidv4();

    const batchSize = 200
    const basePrice = 4900;
    const priceIncrement = 1000;
    const maxPrice = 6900; 

    const price = Math.min(basePrice + (Math.floor(salesCount / batchSize) * priceIncrement), maxPrice);  

    const callbackUrls = {
      success_url: `${process.env.BASE_URL}/checkout/success?price=${price}&transactionid=${transactionId}`,
      cancel_url: `${process.env.BASE_URL}/seo?payment=failed`,
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'PRODUCT_NAME',
              images: ['IMAGE_URL'], // Add your image URL here
              description: 'PRODUCT_DESC'
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      invoice_creation: {
        enabled: true,
      },
      currency: "usd",
      ...callbackUrls,
    });

    await new PaymentIntent({
      transactionId: transactionId,
      paymentIntentId: session.payment_intent || session.id,
      price: {
        amount: price,
        name: 'seo_course'
      },
      quantity: 1,
    }).save();

    res.json({success: true, data: {url: session.url }});
  } catch (err) {
    console.log(err)
    resError(res, err);
  }
});

router.post("/portal", async (req, res) => {
  try{
    const { transactionId, stripePaymentId, email } = req.body;
    
    const paymentIntent = await PaymentIntent.findOne({ 
      ...(transactionId) ? { transactionId } : { },
      ...(stripePaymentId) ? { id: stripePaymentId } : { },
      ...(email && !transactionId && !stripePaymentId) ? { email } : { },
      customerId: { $exists: true, $ne: null }
    });


    if(!paymentIntent || !paymentIntent._id){
      return res.json({ success: false, message: 'Payment not found, please contact support.' });
    }

    if(!paymentIntent.customerId){
      return res.json({ success: false, message: 'Customer not found, please contact support.' });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: paymentIntent.customerId,
      return_url: process.env.BASE_URL,
    });


    res.json({success: true, data: { url: session.url }});
  } catch (err) {
    console.log(err)
    return res.json({ success: false, message: err.message });
  }
});



module.exports = router;
