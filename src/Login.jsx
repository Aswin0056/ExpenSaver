import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  const ADMIN_EMAIL = "admin@gmail.com";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      
      if (res.status === 200 && res.data.token) {
        if (rememberMe) {
          localStorage.setItem("authToken", res.data.token);
          localStorage.setItem("userId", res.data.user.id);
          localStorage.setItem("userEmail", res.data.user.email);
        } else {
          sessionStorage.setItem("authToken", res.data.token);
          sessionStorage.setItem("userId", res.data.user.id);
          sessionStorage.setItem("userEmail", res.data.user.email);
        }
        
        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;

        navigate(res.data.user.email === ADMIN_EMAIL ? "/admin" : "/dashboard");
      } else {
        setMessage("Login failed, please try again.");
      }
    } catch (err) {
      setMessage(err.response?.status === 401 ? "Incorrect email or password." : "Login failed, please try again later.");
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
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="remember-me">
            <input type="checkbox" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />
            <label>Remember Me</label>
          </div>
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <p className="signup-text">
          Don't have an account? <button onClick={() => navigate("/register")} className="register-button">Register</button>
        </p>
        <a href="/" className="home-link">
          <img src={`${process.env.PUBLIC_URL}/left-arrow.png`} alt="Back to Home" className="login-arrow" />
        </a>
      </div>
    </div>
  );
};

export default Login;
