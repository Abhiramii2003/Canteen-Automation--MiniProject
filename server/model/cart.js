const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      name: String,
      price: Number,
      category:String,
      quantity: { type: Number, default: 1 },
      image: String,
    },
  ],
});

const Cart = mongoose.model("Cart", CartSchema);
module.exports = Cart;
