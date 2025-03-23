
const Order = require("../model/orderSchema");


  exports.getOrderNotifications = async (req, res) => {
    try {
      const userId = req.user.id; // Extracted from auth middleware
      const orders = await Order.find({ userId });
  
      // Generate notifications based on order status
      const notifications = orders.map((order) => {
        switch (order.status.toLowerCase()) {
          case "pending":
          return { id: order._id, message: `Your order (${order.token}) is being pending.` };
          case "preparing":
            return { id: order._id, message: `Your order (${order.token}) is being Preparing.` };
          case "completed":
            return { id: order._id, message: `Your order (${order.token}) is ready for pickup!` };
          case "cancelled":
            return { id: order._id, message: `Your order (${order.token}) has been cancelled.` };
          default:
            return null;
        }
      }).filter(Boolean); // Remove null values
  
      res.json(notifications);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };