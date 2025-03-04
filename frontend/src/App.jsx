import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginSignup from "./components/LoginSignup/LoginSignup";
import Home from "./components/HomePage/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Menu from "./components/Dashboard/Menu";
import Orders from "./components/Dashboard/Orders";
import Profile from "./components/Dashboard/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginSignup />} />

        {/* Protected Dashboard with Nested Routes */}
        <Route path="/dashboard/*" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }>
          <Route path="menu" element={<Menu />} />
          <Route path="orders" element={<Orders />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
