import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./Css/Admin.css";

const API_BASE_URL = "http://localhost:5000";
const OWNER_USERNAME = "admin"; // Change this to match the actual admin username

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  // Fetch all users with expenses
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
      if (decoded.username !== OWNER_USERNAME) {
        alert("Access Denied: Admins only.");
        navigate("/dashboard");
        return;
      }
      fetchAllUsers();
    } catch (error) {
      console.error("Error decoding token:", error);
      navigate("/login");
    }
  }, [fetchAllUsers, navigate]); // ✅ Included fetchAllUsers in dependencies

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
              <th>Username</th>
              <th>Title</th>
              <th>Amount</th>
              <th>Quantity</th>
              <th>Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                user.expenses.length > 0 ? (
                  user.expenses.map((expense, i) => (
                    <tr key={`${index}-${i}`}>
                      {i === 0 && <td rowSpan={user.expenses.length}>{user.username}</td>}
                      <td>{expense.title}</td>
                      <td>₹{expense.amount}</td>
                      <td>{expense.quantity || "-"}</td>
                      <td>{new Date(expense.date).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr key={index}>
                    <td>{user.username}</td>
                    <td colSpan="4">No expenses found</td>
                  </tr>
                )
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
