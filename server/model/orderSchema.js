const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    token: Number,
    totalAmount: Number,
    cart: Array,
    seats: Array,
    takeaway: Boolean,
    userId:String,
    paymentMode:String,
    username:String,
    status:{type:String,default:"pending"},
    timestamp: { type: Date, default: Date.now },
  });
  
  const Order = mongoose.model("Order", OrderSchema);
  module.exports=Order