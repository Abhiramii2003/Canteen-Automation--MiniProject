import React, { useState, useEffect } from "react";
import { ShoppingCart, Plus, Minus, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
import Dashboard from "./Dashboard";

const Menu = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [popup, setPopup] = useState(false);

  // Retrieve user data & token from sessionStorage
  const storedUserData = sessionStorage.getItem("userData");
  const userData = storedUserData ? JSON.parse(storedUserData) : null;
  const token = sessionStorage.getItem("token");

  // Get user ID safely
  const userId = userData?._id || null;

  useEffect(() => {
    if (userId && token) {
      fetchMenu();
      fetchCart();
    }
  }, [userId, token]);

  const fetchMenu = async () => {
    try {
      const response = await axios.get("http://localhost:5000/user/menu", {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
      });
      setAllProducts(response.data);
      setFilteredProducts(response.data);
      setCategories([...new Set(response.data.map((item) => item.category))]);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }, // Attach token
      });
      setCart(response.data.items || []);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/cart/add",
        {
          userId,
          productId: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
        },
        { headers: { Authorization: `Bearer ${token}` } } // Attach token
      );

      setCart(response.data.items);
      setPopup(true);
      setTimeout(() => setPopup(false), 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const decreaseQuantity = async (item) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/cart/decrease",
        { userId, productId: item.productId },
        { headers: { Authorization: `Bearer ${token}` } } // Attach token
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
        { headers: { Authorization: `Bearer ${token}` } } // Attach token
      );

      setCart(response.data.items);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container-fluid py-5">
      <Dashboard />
      <h1 className="mb-5 text-center display-4">🍽️ Canteen Menu</h1>

      {popup && (
        <div className="cart-popup">
          <p>✅ Item added to cart!</p>
        </div>
      )}

      <div className="container">
        <div className="row g-4 justify-content-center">
          {filteredProducts.map((item) => (
            <div key={item._id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card text-center shadow-lg p-3 border-0">
                <img src={`http://localhost:5000${item.image}`} className="card-img-top img-fluid" alt={item.name} />
                <div className="card-body">
                  <h3 className="card-title fs-2">{item.name}</h3>
                  <p className="card-text fs-4 fw-bold">₹{item.price}</p>
                  <button className="btn btn-primary" onClick={() => addToCart(item)}>🛒 Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 p-4 border rounded bg-light shadow-lg text-center mx-auto" style={{ maxWidth: "600px" }}>
        <h2>🛍️ Cart <ShoppingCart /></h2>
        {cart.map((item) => (
          <div key={item.productId} className="d-flex justify-content-between align-items-center my-3">
            <span>{item.name} (₹{item.price})</span>
            <div>
              <button className="btn btn-danger" onClick={() => decreaseQuantity(item)}><Minus /></button>
              <span className="mx-2">{item.quantity}</span>
              <button className="btn btn-success" onClick={() => addToCart(item)}><Plus /></button>
              <button className="btn btn-dark ms-2" onClick={() => removeFromCart(item)}><Trash /></button>
            </div>
          </div>
        ))}
        <p className="fw-bold fs-2">Total: ₹{totalAmount}</p>
        <button
          className="cart-btn"
          onClick={() => navigate("/order-details", { state: { cart } })}
        >
          Proceed to Order
        </button>
      </div>
    </div>
  );
};

export default Menu;
