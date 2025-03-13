import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import emailIcon from "../assets/gmail.webp";
import personIcon from "../assets/user.webp";
import passwordIcon from "../assets/password.webp";
import { useNavigate } from "react-router-dom";
//import "./LoginSignup.css"

const API_URL = "http://localhost:5000";

const LoginSignup = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate()

  useEffect(() => {
    setMessage(""); // Clear message when switching between login and signup
  }, [action]);

  const handleChange = useCallback((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, [formData]);

  const handleSubmit = async () => {
    setMessage("");
  
    // Basic validation
    if (!formData.email || !formData.password || (action === "SignUp" && !formData.username)) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }
  
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setMessage("⚠️ Enter a valid email.");
      return;
    }
  
    if (formData.password.length < 6) {
      setMessage("⚠️ Password must be at least 6 characters.");
      return;
    }
  
    const endpoint = action === "SignUp" ? `${API_URL}/register` : `${API_URL}/login`;
  
    setLoading(true);
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ ${data.message || "Success!"}`);
        
        // Reset form fields
        setFormData({ username: "", email: "", password: "" });
  
        // Redirect based on role
        if (data.user.role === "user") {
          navigate("/dashboard");
        } else if (data.user.role === "admin") {
          navigate("/admin-dashboard");
        }
      } else {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
        setFormData({ username: "", email: "", password: "" });
      }
    } catch (error) {
      setFormData({ username: "", email: "", password: "" });
      setMessage("❌ Server error. Please try again.");
    }
    setLoading(false);
  };
  

  const handleForgotPassword = async () => {
    if (!formData.email) {
      setMessage("⚠️ Enter your email for password reset.");
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      setMessage(`✅ ${data.message || "If email exists, check your inbox."}`);
    } catch (error) {
      setMessage("❌ Error sending reset link.");
    }
    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "350px" }}>
        <h3 className="text-center mb-3">{action}</h3>
        {message && (
          <div className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"}`}>
            {message}
          </div>
        )}
        <form>
          {action === "SignUp" && (
            <div className="mb-3 input-group">
              <span className="input-group-text"><img src={personIcon} alt="User" width="20" /></span>
              <input type="text" className="form-control" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
            </div>
          )}
          <div className="mb-3 input-group">
            <span className="input-group-text"><img src={emailIcon} alt="Email" width="20" /></span>
            <input type="email" className="form-control" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="mb-3 input-group">
            <span className="input-group-text"><img src={passwordIcon} alt="Password" width="20" /></span>
            <input type="password" className="form-control" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
          </div>
          {action === "Login" && (
            <div className="text-end mb-3">
              <button type="button" className="btn btn-link p-0" onClick={handleForgotPassword}>
                Forgot Password?
              </button>
            </div>
          )}
          <button type="button" className="btn btn-primary w-100" onClick={handleSubmit} disabled={loading}>
            {loading ? "Processing..." : action}
          </button>
          <button type="button" className="btn btn-secondary w-100 mt-2" onClick={() => setAction(action === "SignUp" ? "Login" : "SignUp")}>
            {action === "SignUp" ? "Switch to Login" : "Switch to Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
