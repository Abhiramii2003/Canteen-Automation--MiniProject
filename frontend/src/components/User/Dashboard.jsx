import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation(); // Get current route
  const [menuOpen, setMenuOpen] = useState(false); // Toggle menu state

  const handleLogout = () => {
    console.log("User logged out");
    // Add logout logic here (e.g., clearing tokens, redirecting to login)
  };

  return (
    <div className="dashboard-container">
      {/* Navbar */}
      <nav className="nav-bar">
        <div className="nav-left">
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
          <h2 className="brand-title">Dashboard</h2>
        </div>

        {/* Navigation Links (Hidden on Small Screens) */}
        <div className={`nav-links ${menuOpen ? "show" : ""}`}>
          <Link className={`nav-link ${location.pathname === "/dashboard-home" ? "active" : ""}`} to="/dashboard-home">
            <i className="fas fa-home"></i> Home
          </Link>
          <Link className={`nav-link ${location.pathname === "/menu" ? "active" : ""}`} to="/menu">
            <i className="fas fa-utensils"></i> Menu
          </Link>
          <Link className={`nav-link ${location.pathname === "/orders" ? "active" : ""}`} to="/orders">
            <i className="fas fa-receipt"></i> Orders
          </Link>
          <Link className={`nav-link ${location.pathname === "/profile" ? "active" : ""}`} to="/profile">
            <i className="fas fa-user"></i> Profile
          </Link>
          <Link className={`nav-link ${location.pathname === "/cart" ? "active" : ""}`} to="/cart">
            <i className="fas fa-cart-shopping"></i> cart
          </Link>
          <Link className={`nav-link ${location.pathname === "/notification" ? "active" : ""}`} to="/notification">
  <i className="fas fa-bell"></i> Notifications
</Link>


          {/* Logout Button */}
          <button className="logout-btn" onClick={handleLogout}>
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
