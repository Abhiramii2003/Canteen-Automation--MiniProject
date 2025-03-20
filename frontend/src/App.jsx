// eslint-disable-next-line no-unused-vars
import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// User Components
import Home from "./components/HomePage/Home";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Dashboard from "./components/User/Dashboard.jsx";
import Menu from "./components/User/Menu.jsx";
import Orders from "./components/User/Orders.jsx";
import Profile from "./components/User/Profile.jsx";
import SeatingArrangement from "./components/User/SeatingArrangement.jsx";
import DashboardHome from "./components/User/DashboardHome.jsx";

// Admin Components
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import OrderManagement from "./components/Admin/OrderManagement.jsx";
import MenuManagement from "./components/Admin/MenuManagement.jsx";
import SeatManagement from "./components/Admin/SeatManagement.jsx";
import UserManagement from "./components/Admin/UserManagement.jsx";
import SalesAnalytics from "./components/Admin/SalesProfitAnalytics.jsx";
import CartPage from "./components/User/cartPage.jsx";


function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<LoginSignup />} />
      

      {/* User Dashboard Pages */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/dashboard-home" element={<DashboardHome />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/order" element={<Orders />} />
      <Route path="/seat" element={<SeatingArrangement />} />
      <Route path="cart" element={<CartPage/>}/>

      {/* Admin Dashboard Pages */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/admin-orders" element={<OrderManagement />} />
      <Route path="/admin-menu" element={<MenuManagement />} />
      <Route path="/admin-seat" element={<SeatManagement />} />
      <Route path="/admin-user" element={<UserManagement />} />
      <Route path="/admin-profit" element={<SalesAnalytics />} />

    
    </Routes>
  );
}

export default App;
