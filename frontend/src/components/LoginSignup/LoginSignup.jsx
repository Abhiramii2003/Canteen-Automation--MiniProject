import React, { useState } from "react";
import "./LoginSignup.css";
import emailIcon from "../assets/gmail.webp";  // ✅ Fixed Import Path
import personIcon from "../assets/user.webp"; // ✅ Fixed Import Path
import passwordIcon from "../assets/password.webp"; // ✅ Fixed Import Path
import "animate.css";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async () => {
    setMessage(""); // Clear previous messages

    if (!formData.email || !formData.password || (action === "Sign Up" && !formData.username)) {
      setMessage("⚠️ Please fill in all fields.");
      return;
    }

    const endpoint = action === "Sign Up" ? "/api/auth/signup" : "/api/auth/login";
    const method = "POST";

    try {
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`✅ ${data.message || "Success!"}`);
      } else {
        setMessage(`❌ ${data.error || "Something went wrong."}`);
      }
    } catch (error) {
      setMessage("❌ Server error. Please try again.");
    }
  };

  // Handle password reset
  const handleForgotPassword = async () => {
    if (!formData.email) {
      setMessage("⚠️ Enter your email for password reset.");
      return;
    }

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await response.json();
      setMessage(`✅ ${data.message || "If email exists, check your inbox."}`);
    } catch (error) {
      setMessage("❌ Error sending reset link.");
    }
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Sign Up" && (
          <div className="input">
            <img src={personIcon} alt="User Icon" />
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
          </div>
        )}

        <div className="input">
          <img src={emailIcon} alt="Email Icon" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="input">
          <img src={passwordIcon} alt="Password Icon" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
        </div>
      </div>

      {action === "Login" && (
        <div className="forgot-password">
          Lost password? <span onClick={handleForgotPassword}>Click Here!</span>
        </div>
      )}

      {message && <div className="message">{message}</div>}

      <div className="submit-container">
        <div className="submit" onClick={() => setAction(action === "Sign Up" ? "Login" : "Sign Up")}>
          {action === "Sign Up" ? "Switch to Login" : "Switch to Sign Up"}
        </div>
      </div>

      <button className="submit" onClick={handleSubmit}>
        {action}
      </button>
    </div>
  );
};

export default LoginSignup;