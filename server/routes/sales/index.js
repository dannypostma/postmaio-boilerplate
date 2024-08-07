const { Router } = require("express");
const router = Router();
const PaymentIntent = require("../../models/PaymentIntent");
const { v4: uuidv4 } = require('uuid');

router.get("/total", async (req, res) => {
    try {
      const paymentIntents = await PaymentIntent.find({ paymentStatus: 'paid' }, { _id: 1});
      const salesCount = paymentIntents.length;

      const transactionId = uuidv4();

      const batchSize = 200
      const basePrice = 4900;
      const priceIncrement = 1000;
      const maxPrice = 6900; 

      const price = Math.min(basePrice + (Math.floor(salesCount / batchSize) * priceIncrement), maxPrice);

      // Calculate the remaining sales for the current tier
      const remainingInTier = salesCount % batchSize;
      const total = batchSize - remainingInTier;

      return res.json({ success: true, data: { total, price, sold: salesCount, transactionId, batchSize } });
    } catch (err) {
      console.log(err)
      return res.json({ success: false, message: err.message });
    }
});

router.post('/email', async (req, res) => {
  try {
    const { email, transactionId } = req.body;
    if (!email) {
      return res.json({ success: false, message: 'Email is required' });
    }

    // Check if transaction exists
    const paymentIntent = await PaymentIntent.findOne({
      transactionId: transactionId,
    });

    if (!paymentIntent || !paymentIntent._id) {
      return res.json({ success: false, message: 'Transaction not found' });
    }   

    await bento.changeEmail({ 
      oldEmail: paymentIntent.email,
      newEmail: email,
    })

    // Send email logic here
    await PaymentIntent.updateOne({
      transactionId: transactionId,
    }, {
      $set: {
        email,
      }
    })

    return res.json({ success: true, data: { email} });
  } catch (err) {
    console.log(err)
    return res.json({ success: false, message: err.message });
  }
})

module.exports = router;