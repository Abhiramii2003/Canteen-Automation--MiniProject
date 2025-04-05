
const Order = require("../model/orderSchema");
const User =require("../model/usermodel")
const Cart =require("../model/cart")
const MenuItems = require("../model/menuModel"); 

exports.confirmOrder = async (req, res) => {
  const userId = req.user.id;

  try {
    const { token, totalAmount, cart, seats, takeaway, paymentMode } = req.body;

    const user = await User.findById(userId);

    // Subtract quantities from MenuItems
    for (const item of cart) {
      const menuItem = await MenuItems.findById(item.productId);

      if (!menuItem) {
        return res.status(404).json({ error: `Menu item ${item.name} not found` });
      }

      if (menuItem.quantity < item.quantity) {
        return res.status(400).json({
          error: `Not enough quantity for ${item.name}. Available: ${menuItem.quantity}`,
        });
      }

      menuItem.quantity -= item.quantity;

      // If quantity becomes zero, mark item as unavailable
      if (menuItem.quantity === 0) {
        menuItem.available = false;
      }

      await menuItem.save();
    }

    // Save order
    const newOrder = new Order({
      token,
      totalAmount,
      cart,
      seats,
      takeaway,
      userId,
      paymentMode,
      username: user.name,
    });

    await newOrder.save();

    // Clear user's cart
    await Cart.findOneAndDelete({ userId });

    res.status(200).json({ message: "Order confirmed successfully!", order: newOrder });

  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ error: "Failed to confirm order" });
  }
};
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
  