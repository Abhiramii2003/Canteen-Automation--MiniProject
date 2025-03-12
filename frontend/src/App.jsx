import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Menu from "./components/Dashboard/Menu";
import Orders from "./components/Dashboard/Orders";
import Profile from "./components/Dashboard/Profile";
import SeatingArrangement from "./components/Dashboard/SeatingArrangement";
import DashboardHome from "./components/Dashboard/DashboardHome";

import Home from "./components/HomePage/Home";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import OrderPage from "./components/Dashboard/Orders";
import "bootstrap/dist/css/bootstrap.min.css";

// Admin Dashboard
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import OrderManagement from "./components/AdminDashboard/OrderManagement";
import MenuManagement from "./components/AdminDashboard/MenuManagement";
import SeatManagement from "./components/AdminDashboard/SeatManagement";
import UserManagement from "./components/AdminDashboard/UserManagement";
import SalesAnalytics from "./components/AdminDashboard/SalesProfitAnalytics";

// ✅ Correct Import for TestUsers
import TestUsers from "./components/TestUsers";
import UserList from "./components/UsersList.jsx";  // ✅ Import the new UserList Component

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />

        {/* User Dashboard */}
        <Route path="/dashboard/*" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
          <Route path="order" element={<OrderPage />} />
          <Route path="seat" element={<SeatingArrangement />} />
        </Route>

        {/* Admin Dashboard */}
        <Route path="/admin/*" element={<AdminDashboard />}>
          <Route path="orders" element={<OrderManagement />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="seat" element={<SeatManagement />} />
          <Route path="user" element={<UserManagement />} />
          <Route path="profit" element={<SalesAnalytics />} />
        </Route>

        {/* Test Users Route (To check user API) */}
        <Route path="/test-users" element={<TestUsers />} />
        
        {/* ✅ User List Route */}
        <Route path="/user-list" element={<UserList />} />
      </Routes>
    
  );
}

export default App;
