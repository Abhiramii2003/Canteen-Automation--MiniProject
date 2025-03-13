import React from "react";
import { Link } from "react-router-dom";
import "./AdminDashboard.css";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  return (
    <div className="row">
      <div className="admin-dashboard col-md-4 rounded">
        {/* Sidebar */}
      <Sidebar/>
      </div>
      {/* Main Content */}
      <div className="main-content col-md-8">
        <div className="navbar">Admin Dashboard</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
