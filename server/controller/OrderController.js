
const Order = require("../model/orderSchema");
const Cart =require("../model/cart")
exports.confirmOrder=async (req, res) => {
    console.log(req.user.id);
    const userId=req.user.id
    try {
      const { token, totalAmount, cart, seats, takeaway,paymentMode } = req.body;
      console.log(req.body);
      
  
      // Save order to the database
      const newOrder = new Order({
        token,
        totalAmount,
        cart,
        seats,
        takeaway,
        userId,
        paymentMode, // Ensure correct key name here
      });
      
      console.log("New Order:", newOrder);
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


  exports.updateOrderStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        { status },
        { new: true }
      );
      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Error updating order", error });
    }
  };
  exports.getAllOrders = async (req, res) => {
    try {
      const orders = await Order.find();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders", error });
    }
  };

  exports.getLastToken = async (req, res) => {
    try {
      const lastOrder = await Order.findOne().sort({ timestamp: -1 }); // Get the most recent order
      const lastToken = lastOrder ? parseInt(lastOrder.token, 10) || 9 : 9; // Ensure it's a number, default to 9
      res.json({ lastToken });
    } catch (error) {
      res.status(500).json({ message: "Error fetching last token", error });
    }
  };
  