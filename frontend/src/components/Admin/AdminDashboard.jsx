import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
        <Link to="/admin-profit">Analytics</Link>
          <Link to="/admin-orders">Manage Orders</Link>
          <Link to="/admin-user">User Management</Link>
        
          <Link to="/admin-menu">Menu</Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="navbar">Admin Dashboard</div>
        <Outlet /> {/* Displays nested routes */}
      </div>
    </div>
  );
};

export default AdminDashboard;
