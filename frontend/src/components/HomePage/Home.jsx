import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css"; // Import Home CSS

const Home = () => {
  const navigate = useNavigate(); // For navigation

  return (
    <div className="home-container">
      <h1>Welcome to Canteen Automation System</h1>
      <p>Manage your food orders with ease. Choose your role to continue:</p>
      
      <div className="button-container">
        <button onClick={() => navigate("/login")} className="admin-btn">Admin</button>
        <button onClick={() => navigate("/login")} className="user-btn">User</button>
      </div>
    </div>
  );
};

export default Home;
