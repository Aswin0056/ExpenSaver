import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import "./Css/Dashboard.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Navbar = ({ handleLogout, username }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="navbar-D">
      {/* Left Side - Logo */}
      <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className="logo-D" />

      {/* Right Side - Profile Section */}
      <div className="navbar-right-D">
        <div className="profile-dropdown">
          <img 
            src={`${process.env.PUBLIC_URL}/profile-logo.png`} 
            alt="Profile" 
            className="profile-logo"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          <span className="username" onClick={() => setDropdownOpen(!dropdownOpen)}>
            {username || "User"} 
          </span>
          
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={() => navigate("/profilesettings")}>Profile Settings</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <ul>
        <li onClick={() => navigate("/dashboard")}>Dashboard</li>
        <li onClick={() => navigate("/expenses")}>Expenses</li>
        <li onClick={() => navigate("/income")}>Income</li>
      </ul>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [username, setUsername] = useState("");
  const [lastExpense, setLastExpense] = useState(null);
  const [error] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);
      } catch (error) {
        console.error("Error decoding token:", error);
        navigate("/login");
      }
    };

    checkAuth();
  }, [navigate]);

  const token = localStorage.getItem("authToken");

  const fetchLastExpense = async () => {
    if (!token) {
      console.error("No token found. User not authenticated.");
      return;
    }
  
    try {
      console.log("Fetching last expense...");
      const response = await axios.get(`${API_BASE_URL}/dashboard`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log("Last Expense Response:", response.data);
      if (response.data.lastExpense) {
        setLastExpense(response.data.lastExpense);
      } else {
        console.warn("No expenses found for this user.");
        setLastExpense(null);
      }
    } catch (error) {
      console.error("Error fetching last expense:", error.response?.data || error);
    }
  };
  
  useEffect(() => {
    fetchLastExpense();
  }
);  // Fetch once when the component mounts
  
  const handleAddExpense = async () => {
    if (!title || !amount) {
      alert("Title and Amount are required!");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized! Please login.");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/expenses`,
        { title, amount: parseFloat(amount), quantity: quantity ? parseInt(quantity) : 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Expense added successfully!");
      setLastExpense(res.data.expense);
      setTitle("");
      setAmount("");
      setQuantity("");
    } catch (err) {
      console.error("Error adding expense:", err.response?.data || err);
      alert("Failed to add expense. Check console for details.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <Navbar handleLogout={handleLogout} username={username} />
      <div className="main-content">
        <Sidebar />
        <div className="dashboard-content">
          <h2>Welcome to Your Dashboard, {username || "User"}!</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {lastExpense ? (
            <div className="last-expense">
              <h3>Last Added Expense</h3>
              <table className="expense-table">
                <thead>
                  <tr><th>Title</th><th>Amount</th><th>Quantity</th><th>Date & Time</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{lastExpense.title}</td>
                    <td>₹{lastExpense.amount}</td>
                    <td>{lastExpense.quantity || "-"}</td>
                    <td>{new Date(lastExpense.date).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (<p>No expenses added yet.</p>)}
          <h3>Add New Expense</h3>
          <div className="expense-form">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="number" placeholder="Quantity (optional)" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <button className="addx-button" onClick={handleAddExpense}>Add Expense</button>
          </div>
        </div>
      </div>

   
    </div>
  );
};

export default Dashboard;
