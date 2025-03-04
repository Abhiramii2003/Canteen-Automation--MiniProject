import React, { useState } from "react";
import "./LoginSignup.css";
import emailIcon from "../assets/DALL·E 2025-02-22 11.35.42 - A simple, modern password icon featuring a lock, minimalistic style, flat design.webp";
import personIcon from "../assets/DALL·E 2025-02-22 11.35.51 - A simple, modern person icon featuring a user silhouette, minimalistic style, flat design.webp";
import passwordIcon from "../assets/DALL·E 2025-02-22 11.35.54 - A simple, modern email icon featuring an envelope, minimalistic style, flat design.webp";

const LoginSignup = () => {
  const [action, setAction] = useState("Sign Up");

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        {action === "Login" ? (
          <div></div>
        ) : (
          <div className="input">
            <img src={personIcon} alt="User Icon" />
            <input type="text" placeholder="Username" />
          </div>
        )}

        <div className="input">
          <img src={emailIcon} alt="Email Icon" />
          <input type="email" placeholder="Email" />
        </div>
        <div className="input">
          <img src={passwordIcon} alt="Password Icon" />
          <input type="password" placeholder="Password" />
        </div>
      </div>

      {action === "Sign Up" ? (
        <div></div>
      ) : (
        <div className="forgot-password">
          Lost password? <span>Click Here!</span>
        </div>
      )}

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
