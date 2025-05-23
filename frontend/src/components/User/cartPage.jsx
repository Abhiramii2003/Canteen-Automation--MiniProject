import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Plus, Minus, Trash } from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CartPage.css";
import Dashboard from "./Dashboard";

const CartPage = () => {
  const navigate = useNavigate();

  const storedUserData = sessionStorage.getItem("userData");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;
  const token = sessionStorage.getItem("token");
  const userId = userData?._id || null;

  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]); // Store menu items

  useEffect(() => {
    if (userId && token) {
      fetchCart();
      fetchMenu();
    }
  }, [userId, token]);

  const fetchMenu = async () => {
    try {
      const result = await axios.get("http://localhost:5000/user/menu", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMenu(result.data); // Store menu data
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (item) => {
    const menuItem = menu.find((menuItem) => menuItem._id === item.productId);

    if (!menuItem) {
      alert("Menu item not found.");
      return;
    }

    if (item.quantity >= menuItem.quantity) {
      alert("Cannot add more. Maximum available quantity reached.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/cart/add",
        {
          userId,
          productId: item.productId,
          name: item.name,
          category: item.category,
          price: item.price,
          image: item.image,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.items);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const decreaseQuantity = async (item) => {

 

    try {
      const response = await axios.post(
        "http://localhost:5000/cart/decrease",
        { userId, productId: item.productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(response.data.items);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const removeFromCart = async (item) => {
     try {
       const response = await axios.post(
         "http://localhost:5000/cart/remove",
         { userId, productId: item.productId },
         { headers: { Authorization: `Bearer ${token}` } }
       );
 
       setCart(response.data.items);
     } catch (error) {
       console.error("Error removing item:", error);
     }
   };
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="container-fluid p-5">
        <Dashboard />
        <div className="cart-container mt-3">
          <h2 className="cart-title">
            🛍️ Your Cart <ShoppingCart />
          </h2>

          {cart.length === 0 ? (
            <p className="text-center text-muted">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item.productId} className="cart-item">
                <span>{item.name} (₹{item.price})</span>
                <div>
                  <button className="btn btn-danger" onClick={() => decreaseQuantity(item)}>
                    <Minus />
                  </button>
                  <span className="cart-quantity">{item.quantity}</span>
                  <button className="btn btn-success" onClick={() => addToCart(item)}>
                    <Plus />
                  </button>
                  <button className="btn btn-dark ms-2" onClick={() => removeFromCart(item)}>
                    <Trash />
                  </button>
                </div>
              </div>
            ))
          )}

          <p className="cart-total">Total: ₹{totalAmount}</p>
          <button
            className="cart-btn"
            onClick={() => navigate("/order-details", { state: { cart, userData } })}
          >
            Proceed to Order
          </button>
        </div>
      </div>
    </>
  );
};

export default CartPage;
