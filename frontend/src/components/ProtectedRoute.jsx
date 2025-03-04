import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ adminOnly = false }) => {
  // TEMPORARY: Allow access without authentication
  const user = { role: "user" }; // Mock user for now

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
