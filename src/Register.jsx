import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Css/Register.css";

const Register = () => {
  const [username, setUsername] = useState(""); // ✅ Username State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Use API URL from environment variables
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post(`${API_URL}/register`, { 
        username, // ✅ Sending Username
        email, 
        password 
      });

      console.log("Register Response:", res.data);

      if (res.data.message === "User already exists") {
        setMessage("Email is already registered. Try logging in.");
      } else if (res.data.message === "Registration successful!") {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (err) {
      console.error("Register Error:", err.response?.data?.error);
      setMessage(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };

  return (
    <div className="register-container">
      <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className="register-logo" />
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Username</label> 
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        {message && <p className="error-message">{message}</p>}

        <p className="login-text">
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} className="login-button">
            Login
          </button>
        </p>
      </div>
      <h6 style={{"fontFamily":'cursive', "color":'grey'}}>Developed By Aswin</h6>
    </div>
  );
};

export default Register;
