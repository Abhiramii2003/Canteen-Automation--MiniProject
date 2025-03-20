import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css"; // Import styles
import Dashboard from "./Dashboard";

const Order = ({ userId }) => {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    fetchMenu();
    fetchOrders();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/menu"); // Backend API for menu
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/orders/${userId}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.name === item.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      const response = await axios.post("http://localhost:5000/api/orders/place", {
        userId,
        items: cart,
        totalAmount,
      });
      alert("Order placed successfully!");
      setCart([]);
      fetchOrders(); // Refresh orders after placing
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <>
    <div className="container-fluid py-5">
      <Dashboard/>
  
    <div className="order-container">
      <h2>Menu</h2>
      <div className="menu-list">
        {menu.map((item) => (
          <div key={item._id} className="menu-item">
            <p>{item.name} - ₹{item.price}</p>
            <button onClick={() => addToCart(item)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <h2>Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty</p> : (
        <div>
          {cart.map((item, index) => (
            <p key={index}>{item.name} x {item.quantity} - ₹{item.price * item.quantity}</p>
          ))}
          <button onClick={placeOrder}>Place Order</button>
        </div>
      )}

      <h2>My Orders</h2>
      {orders.length === 0 ? <p>No orders yet</p> : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <strong>Order ID:</strong> {order._id} - <strong>Status:</strong> {order.status}
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
    </>
  );
};

export default Order;
