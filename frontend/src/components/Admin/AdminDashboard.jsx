import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        <div className="navbar">Admin Dashboard</div>

        {/* Dashboard Stats */}
        <div className="dashboard-cards">
          <div className="card">
            <i className="fas fa-users card-icon"></i>
            <h3 className="card-title">Total Users</h3>
            <p>1,250</p>
          </div>

          <div className="card">
            <i className="fas fa-chart-line card-icon"></i>
            <h3 className="card-title">Revenue</h3>
            <p>$85,230</p>
          </div>

          <div className="card">
            <i className="fas fa-box card-icon"></i>
            <h3 className="card-title">Orders</h3>
            <p>3,429</p>
          </div>

          <div className="card">
            <i className="fas fa-comments card-icon"></i>
            <h3 className="card-title">Messages</h3>
            <p>243</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
