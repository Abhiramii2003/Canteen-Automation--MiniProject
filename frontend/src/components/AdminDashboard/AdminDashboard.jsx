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
          <Link to="/orders">Manage Orders</Link>
          <Link to="/users">User Management</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/admin/menu">Menu</Link>
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
