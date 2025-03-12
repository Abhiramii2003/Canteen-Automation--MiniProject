import React from "react"; 
import { Outlet, Link, useLocation } from "react-router-dom";
import Order from "./Orders"; // Import the Order component
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Dashboard.css";

const Dashboard = () => {
  const location = useLocation(); // Get current route

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Dashboard</h1>

      {/* Navigation */}
      <nav className="nav nav-tabs justify-content-center">
        <Link className={`nav-link ${location.pathname === "/dashboard" ? "active" : ""}`} to="/dashboard">
          Home
        </Link>
        <Link className={`nav-link ${location.pathname === "/dashboard/menu" ? "active" : ""}`} to="/dashboard/menu">
          Menu
        </Link>
        <Link className={`nav-link ${location.pathname === "/dashboard/orders" ? "active" : ""}`} to="/dashboard/orders">
          Orders
        </Link>
        <Link className={`nav-link ${location.pathname === "/dashboard/profile" ? "active" : ""}`} to="/dashboard/profile">
          Profile
        </Link>
        <Link className={`nav-link ${location.pathname === "/dashboard/SeatingArrangement" ? "active" : ""}`} to="/dashboard/SeatingArrangement">
          Seat
        </Link>
      </nav>

      {/* Render Orders component when the orders tab is active */}
      <div className="mt-3">
        {location.pathname === "/dashboard/orders" ? <Order /> : <Outlet />}
      </div>
    </div>
  );
};

export default Dashboard;
