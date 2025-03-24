import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    revenue: 0,
    totalOrders: 0,
    menuCount: 0, // Replace messages with menuCount
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/admin/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardStats();
  }, []);

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
            <p>{stats.totalUsers}</p>
          </div>

          <div className="card">
            <i className="fas fa-chart-line card-icon"></i>
            <h3 className="card-title">Revenue</h3>
            <p>${stats.revenue}</p>
          </div>

          <div className="card">
            <i className="fas fa-box card-icon"></i>
            <h3 className="card-title">Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>

          <div className="card">
            <i className="fas fa-utensils card-icon"></i> {/* Icon for menu */}
            <h3 className="card-title">Menu Items</h3>
            <p>{stats.menuCount}</p> {/* Display menu count */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;