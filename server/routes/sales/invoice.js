
const { Router } = require("express");
const router = Router();
const PaymentIntent = require("../../models/PaymentIntent");
const { v4: uuidv4 } = require('uuid');

router.post('/all', async (req, res) => {
  try {

    const { transactionId, stripePaymentId, email } = req.body;

    if(!transactionId && !stripePaymentId && !email){
      return res.json({ success: false, message: 'Please provide a transactionId, stripePaymentId or email.' });
    }
    
    const paymentIntents = await PaymentIntent.find({ 
      ...(transactionId) ? { transactionId } : { },
      ...(stripePaymentId) ? { id: stripePaymentId } : { },
      ...(email && !transactionId && !stripePaymentId) ? { email } : { },
      customerId: { $exists: true }
    }, { id:1, amountTotal: 1, createdAt:1, status: 1, amountTotal: 1, currency: 1, amountRefunded: 1, price: 1});


    if(!paymentIntents){
      return res.json({ success: false, message: 'Payment not found, please contact support.' });
    }

    return res.json({ success: true, data: { invoices: paymentIntents} });
  } catch (err) {
    console.log(err)
    return res.json({ success: false, message: err.message });
  }
})

module.exports = router;