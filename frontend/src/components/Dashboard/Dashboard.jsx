import React from "react";
import { Link, Routes, Route, Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css"; // Import CSS
import Menu from "./Menu";
import Orders from "./Orders";
import Profile from "./Profile";

const DashboardHome = () => (
  <div className="dashboard-welcome">
    <h1>Welcome to Your Dashboard</h1>
    <p>Manage your orders, explore the menu, and enjoy seamless food ordering.</p>
  </div>
);

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Canteen</h2>
        <nav>
          <ul>
            <li><Link to="/dashboard">🏠 Home</Link></li>
            <li><Link to="/dashboard/menu">🍽 Menu</Link></li>
            <li><Link to="/dashboard/orders">📦 My Orders</Link></li>
            <li><Link to="/dashboard/profile">👤 Profile</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">🚪 Logout</button></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <Routes>
          <Route index element={<DashboardHome />} /> {/* Default content when visiting /dashboard */}
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Routes>
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
