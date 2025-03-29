import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Css/Admin.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
const ADMIN_EMAIL = "admin@gmail.com";

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const fetchAllUsers = useCallback(async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/admin/users-expenses`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired. Please log in again.");
        localStorage.removeItem("authToken");
        navigate("/login");
      } else {
        setError("Error fetching users and expenses.");
      }
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.email !== ADMIN_EMAIL) {
        alert("Access Denied: Admins only.");
        navigate("/dashboard");
        return;
      }
      fetchAllUsers();
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [fetchAllUsers, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="admin-container">
      <nav className="navbar">
        <h2>Admin Panel</h2>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </nav>
      <div className="admin-content">
        <h3>All Users and Their Expenses</h3>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <table className="admin-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={index}>
                  <td>{user.email}</td>
                  <td>{user.title || "N/A"}</td>
                  <td>₹{user.amount || "N/A"}</td>
                  <td>{user.quantity || "-"}</td>
                  <td>{user.date ? new Date(user.date).toLocaleString() : "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5">No users or expenses found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
