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
  const [items,setItems]=useState([])
  const [popup, setPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

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
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllProducts(response.data);
      setFilteredProducts(response.data);

      // Extract unique categories
      const uniqueCategories = [...new Set(response.data.map((item) => item.category))];
      setCategories(["All", ...uniqueCategories]); // Include "All" option
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
    const menuItem = allProducts.find((menuItem) => menuItem._id === item.productId || menuItem._id === item._id);
  
    try {
      // Fetch latest cart before checking quantity
      const response = await axios.get(`http://localhost:5000/cart/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const currentCartItems = response.data.items;
  
      // Find the matching item in the cart
      const existingCartItem = currentCartItems.find(
        (cartItem) => cartItem.productId === item._id || cartItem.productId === item.productId
      );
  
      const currentQty = existingCartItem ? existingCartItem.quantity : 0;
  
      // Quantity check
      if (currentQty >= menuItem.quantity) {
        alert("Cannot add more. Maximum available quantity reached.");
        return;
      }
  
      // Proceed with adding to cart
      const addResponse = await axios.post(
        "http://localhost:5000/cart/add",
        {
          userId,
          productId: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setCart(addResponse.data.items);
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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(response.data.items);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };
  const IncreseQuantity = async (item) => {
    const menuItem = allProducts.find((menuItem) => menuItem._id === item.productId);

  

    if (item.quantity >= menuItem.quantity) {
      alert("Cannot add more. Maximum available quantity reached.");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/cart/add",
        { userId,
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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);

    if (category === "All") {
      setFilteredProducts(allProducts);
    } else {
      setFilteredProducts(allProducts.filter((item) => item.category === category));
    }
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container-fluid py-5">
      <Dashboard />
      <h1 className="mb-4 text-center display-4">🍽️ Canteen Menu</h1>

      {/* Popup Notification */}
      {popup && (
        <div className="cart-popup">
          <p>✅ Item added to cart!</p>
        </div>
      )}

      {/* Category Filter Buttons */}
      <div className="d-flex justify-content-center mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`btn mx-2 ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="container">
        <div className="row g-4 justify-content-center">
        {filteredProducts.length > 0 ? (
  filteredProducts.map((item) => {
    const isOutOfStock = item.quantity <= 0 || item.available === false;

    return (
      <div key={item._id} className="col-lg-3 col-md-4 col-sm-6">
        <div className={`card text-center shadow-lg p-3 border-0 ${isOutOfStock ? 'out-of-stock-card' : ''}`} style={{ opacity: isOutOfStock ? 0.6 : 1 }}>
          <img src={`http://localhost:5000${item.image}`} className="card-img-top img-fluid" alt={item.name} />
          <div className="card-body">
            <h3 className="card-title fs-2">{item.name}</h3>
            <p className="card-text fs-4 fw-bold">₹{item.price}</p>
            <p className="card-text text-dark">{item.description}</p>
            {isOutOfStock ? (
              <p className="text-danger fw-bold fs-5">❌ Out of Stock</p>
            ) : (
              <button className="btn btn-primary" onClick={() => addToCart(item)}>🛒 Add to Cart</button>
            )}
          </div>
        </div>
      </div>
    );
  })
) : (
  <p className="text-center fs-4 text-muted">No items available in this category.</p>
)}

        </div>
      </div>

      {/* Cart Section */}
      <div className="mt-5 p-4 border rounded bg-light shadow-lg text-center mx-auto" style={{ maxWidth: "600px" }}>
        <h2>🛍️ Cart <ShoppingCart /></h2>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div key={item.productId} className="d-flex justify-content-between align-items-center my-3">
              <span>{item.name} (₹{item.price})</span>
              <div>
                <button className="btn btn-danger" onClick={() => decreaseQuantity(item)}><Minus /></button>
                <span className="mx-2">{item.quantity}</span>
                <button className="btn btn-success" onClick={() => IncreseQuantity(item)}><Plus /></button>
                <button className="btn btn-dark ms-2" onClick={() => removeFromCart(item)}><Trash /></button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted fs-4">Your cart is empty.</p>
        )}
        <p className="fw-bold fs-2">Total: ₹{totalAmount}</p>
        <button
          className="cart-btn"
          onClick={() => navigate("/order-details", { state: { cart } })}
          disabled={cart.length === 0}
        >
          Proceed to Order
        </button>
      </div>
    </div>
  );
};

export default Menu;
