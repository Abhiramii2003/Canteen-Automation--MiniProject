
const Order = require("../model/orderSchema");
const Cart =require("../model/cart")
exports.confirmOrder=async (req, res) => {
    console.log(req.user.id);
    const userId=req.user.id
    try {
      const { token, totalAmount, cart, seats, takeaway } = req.body;
  
      // Save order to the database
      const newOrder = new Order({ token, totalAmount, cart, seats, takeaway,userId });
      await newOrder.save();
      const deleteCart = await Cart.findOneAndDelete({ userId });
      res.status(200).json({ message: "Order confirmed successfully!", order: newOrder });
    

    } catch (error) {
      console.error("Error confirming order:", error);
      res.status(500).json({ error: "Failed to confirm order" });
    }
  }
  exports.getorders=async (req, res) => {
    try {
      const userId = req.user.id; // Get userId from verified JWT token
      const orders = await Order.find({ userId }).sort({ timestamp: -1 });
  
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Server Error" });
    }
  };
  