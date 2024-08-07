const mongoose = require("mongoose");

const PaymentIntentSchema = new mongoose.Schema({
  paymentIntentId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  customerId: {
    type: String,
    required: false,
  },  
  id: {
    type: String,
    required: false,
  },
  uid: {
    type: String,
    required: false,
  },
  price: {
    id: {
      type: String,
      required: false,
    },
    amount: {
      type: String,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  },
  paymentStatus: {
    type: String,
    required: false,
    index: true,
  },
  amountTotal: {
    type: Number,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  transactionId: {
    type: String,
    required: false,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  isDevelopment: {
    type: Boolean,
    default: false,
  },
  currency: {
    type: String,
    default: "usd"
  },
  fee: {
    type: Number,
    default: 0
  },
  tax: {
    type: Number,
    default: 0
  },
  feeInUsd: {
    type: Number,
    default: 0,
  },
},
{
  timestamps: true,
});

const PaymentIntent = mongoose.model("PaymentIntent", PaymentIntentSchema);

module.exports = PaymentIntent;
