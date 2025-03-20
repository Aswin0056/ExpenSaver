import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Css/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });

      console.log("Login Response:", res.data); // Debugging log

      if (res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        localStorage.setItem("userId", res.data.userId); // ✅ Store userId

        axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
        navigate("/dashboard"); // Redirect only if login is successful
      } else {
        setMessage("Login failed, please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err.response?.data?.error); // Debugging log
      setMessage(err.response?.data?.error || "Invalid email or password");
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
          <button type="submit" className="login-button">Login</button>
        </form>
        {message && <p className="error-message">{message}</p>}
        <p className="signup-text">
          Don't have an account?{" "}
          <button onClick={() => navigate("/register")} className="register-button">
            Register
          </button>
          <a href="/ExpenSaver"> <img src={`${process.env.PUBLIC_URL}/left-arrow.png`} alt="logo" className="login-arrow" /> </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
