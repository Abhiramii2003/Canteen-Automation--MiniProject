
const Cart = require("../model/cart");

// Get Cart for a User

exports.getCart= async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      if (!cart) return res.json({ items: [] });
  
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error fetching cart", error });
    }
  }
// Add/Update Item in Cart

exports.addtocart= async (req, res) => {
    const { userId, productId, name, price, image,category } = req.body;
    console.log(req.body);
    
  
    try {
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [] });
      }
  
      const existingItem = cart.items.find((item) => item.productId.toString() === productId);
  
      if (existingItem) {
        existingItem.quantity += 1; // Increase quantity
      } else {
        cart.items.push({ productId, name, price, image, quantity: 1,category });
      }
  
      await cart.save();
      res.json({ items: cart.items });
    } catch (error) {
      res.status(500).json({ error: "Server error while adding to cart" });
    }
  }
// Remove or Decrease Quantity
exports.removefromCart=async (req, res) => {
    try {
      const { userId, productId } = req.body;
      let cart = await Cart.findOne({ userId });
  
      if (!cart) return res.status(404).json({ message: "Cart not found" });
  
      cart.items = cart.items
        .map((item) => {
          if (item.productId.toString() === productId) {
            item.quantity -= 1;
            return item.quantity > 0 ? item : null;
          }
          return item;
        })
        .filter(Boolean);
  
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error removing item", error });
    }
  }
  //decrease the quantity
  exports.decreaseQuantity=async (req, res) => {
    try {
      const { userId, productId } = req.body;
      let cart = await Cart.findOne({ userId });
  
      if (!cart) return res.json({ message: "Cart is empty" });
  
      cart.items = cart.items.map((item) => {
        if (item.productId.toString() === productId) {
          item.quantity -= 1;
        }
        return item;
      }).filter((item) => item.quantity > 0);
  
      await cart.save();
      res.json(cart);
    } catch (error) {
      res.status(500).json({ message: "Error updating cart", error });
    }
  }
// Clear Cart

exports.clearfromcart=async (req, res) => {
    try {
      await Cart.findOneAndDelete({ userId: req.body.userId });
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Error clearing cart", error });
    }
  };


