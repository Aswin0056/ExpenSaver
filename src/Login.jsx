import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Use API URL from environment variables
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });

      console.log("🔍 Login Response:", res.data); // Debugging log

      if (res.data.accessToken) {
        localStorage.setItem("authToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken); // ✅ Store refresh token
        localStorage.setItem("userId", res.data.userId || ""); // ✅ Store userId safely

        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.accessToken}`;
        
        console.log("✅ Login successful! Redirecting...");
        navigate("/dashboard"); // ✅ Redirect to dashboard on success
      } else {
        setMessage("Login failed, please try again.");
      }
    } catch (err) {
      console.error("🚨 Login Error:", err.response?.data?.error || err.message); // Debugging log
      setMessage(err.response?.data?.error || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className="login-logo" />
      <div className="login-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {message && <p className="error-message">{message}</p>}

        <p className="signup-text">
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")} className="register-button">
            Register
          </button>
        </p>

        {/* ✅ Link to Homepage */}
        <a href="/" className="home-link">
          <img 
            src={`${process.env.PUBLIC_URL}/left-arrow.png`} 
            alt="Back to Home" 
            className="login-arrow" 
          />
        </a>
      </div>
    </div>
  );
};

export default Login;
