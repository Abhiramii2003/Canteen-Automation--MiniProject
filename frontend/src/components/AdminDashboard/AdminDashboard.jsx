import React from "react";
import { Link } from "react-router-dom";
import "./adminDashboard.css"; // Import CSS

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="logo">Admin Panel</h2>
        <nav>
          <ul>
            <li><Link to="/admin/orders">📦 Manage Orders</Link></li>
            <li><Link to="/admin/inventory">📊 Inventory</Link></li>
            <li><Link to="/admin/reports">📈 Sales Reports</Link></li>
            <li><Link to="/admin/users">👥 Users</Link></li>
            <li><Link to="/">🚪 Logout</Link></li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <h1>Welcome, Admin!</h1>
        <p>Manage orders, inventory, and reports from here.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
