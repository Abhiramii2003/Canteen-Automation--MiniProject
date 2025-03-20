import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Menu.css";
import Dashboard from "./Dashboard";





const Menu = () => {
  const navigate = useNavigate();
  const categories = ["Breakfast", "Lunch", "Snacks", "Drinks"];
  const menuItems = {
    Breakfast: [
      { name: "Pancakes", price: 50, image: "/images/pancake.jpg" },
      { name: "Omelette", price: 10, image: "/images/omelette.jpg" },
      { name: "Toast", price: 50, image: "/images/toast.jpg" },
      { name: "Idli", price: 20, image: "/images/idli.jpg" },
    ],
    Lunch: [
      { name: "Rice & Curry", price: 40, image: "/images/rice_curry.jpg" },
      { name: "Pasta", price: 60, image: "/images/pasta.jpg" },
      { name: "Burger", price: 50, image: "/images/burger.jpg" },
      { name: "Salad", price: 20, image: "/images/salad.jpg" },
    ],
    Snacks: [
      { name: "Sandwich", price: 40, image: "/images/sandwich.jpg" },
      { name: "French Fries", price: 30, image: "/images/fries.jpg" },
      { name: "Momos", price: 50, image: "/images/momos.jpg" },
    ],
    Drinks: [
      { name: "Tea", price: 20, image: "/images/tea.jpg" },
      { name: "Coffee", price: 30, image: "/images/coffee.jpg" },
      { name: "Juice", price: 40, image: "/images/juice.jpg" },
      { name: "Smoothie", price: 50, image: "/images/smoothie.jpg" },
    ],
  };

  const [selectedCategory, setSelectedCategory] = useState("Breakfast");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const addToCart = (item) => {
    const updatedCart = [...cart, item];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleProceedToOrder = () => {
    console.log("Proceed button clicked"); // Debugging log
    navigate("/dashboard/orders");
  };

  const totalAmount = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="container-fluid py-5">
      <Dashboard/>
      <h1 className="mb-5 text-center display-4">🍽️ Canteen Menu</h1>
      <div className="d-flex justify-content-center mb-4">
        <select
          className="form-select text-center fs-5 w-auto mx-auto"
          style={{ padding: "10px 20px" }}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="row g-4 justify-content-center">
        {menuItems[selectedCategory].map((item) => (
          <div key={item.name} className="col-lg-3 col-md-4 col-sm-6">
            <div className="card text-center shadow-lg p-3 border-0">
              <img
                src={item.image}
                className="card-img-top img-fluid"
                alt={item.name}
                style={{
                  height: "200px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />
              <div className="card-body">
                <h3 className="card-title fs-2">{item.name}</h3>
                <p className="card-text fs-4 fw-bold">₹{item.price}</p>
                <button
                  className="btn btn-primary btn-lg px-4 py-2"
                  onClick={() => addToCart(item)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="mt-5 p-4 border rounded bg-light shadow-lg text-center mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h2 className="fs-1 text-center">
          🛍️ Cart <ShoppingCart className="ms-2" />
        </h2>
        {cart.length === 0 ? (
          <p className="text-muted fs-3 text-center">Your cart is empty.</p>
        ) : (
          <>
            <ul className="list-group fs-4">
              {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between">
                  {item.name} - ₹{item.price}
                </li>
              ))}
            </ul>
            <p className="mt-3 fw-bold fs-2 text-center">Total: ₹{totalAmount}</p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-success btn-lg px-5 py-3"
                onClick={handleProceedToOrder}
              >
                Proceed to Order
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;