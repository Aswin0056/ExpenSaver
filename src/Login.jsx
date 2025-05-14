import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Css/Login.css";
import Navbar from "./Navbar";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false); // NEW: checkbox state
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const ADMIN_EMAIL = "expensaver.admin@gmail.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });

      if (res.status === 200 && res.data.token) {
        const storage = stayLoggedIn ? localStorage : sessionStorage;

        storage.setItem("authToken", res.data.token);
        storage.setItem("userId", res.data.user.id);
        storage.setItem("userEmail", res.data.user.email);

        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

        setMessage("Login successful!");
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);

        setTimeout(() => {
          if (res.data.user.email === ADMIN_EMAIL) {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        }, 1500);
      } else {
        setMessage("Login failed, please try again.");
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setMessage("Incorrect email or password.");
      } else if (err.response?.status === 500) {
        setMessage("Server error, try again later.");
      } else {
        setMessage("Login failed, please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="login-container">
        {showNotification && (
          <div className="notification">
            <p>{message}</p>
          </div>
        )}

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

            {/* ✅ Stay Logged In Checkbox */}
            <div className="input-group" style={{ display: "flex", alignItems: "center", marginLeft: "-190px" }}>
              <input
                type="checkbox"
                id="stayLoggedIn"
                checked={stayLoggedIn}
                onChange={() => setStayLoggedIn(!stayLoggedIn)}
                style={{ marginRight: "-180px" }}
              />
              <label htmlFor="stayLoggedIn">Stay logged in</label>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {message && !showNotification && (
            <div className={`message ${message.includes("successful") ? "success" : "error"}`}>
              {message}
            </div>
          )}

          <p className="signup-text">
            Don't have an account?{" "}
            <button onClick={() => navigate("/register")} className="register-button">
              Register
            </button>
          </p>

          <a href="/" className="home-link">
            <img
              src={`${process.env.PUBLIC_URL}/left-arrow.png`}
              alt="Back to Home"
              className="login-arrow"
            />
          </a>
        </div>

        <h5 style={{ fontSize: "6px", textAlign: "center", marginTop: "5px" }}>
          Powered by <strong style={{ color: 'black' }}>Azh</strong>
          <strong style={{ color: 'goldenrod' }}>Studio</strong>
        </h5>
      </div>
    </div>
  );
};

export default Login;
