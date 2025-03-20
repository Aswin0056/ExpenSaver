import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Css/Dashboard.css";

const Navbar = ({ handleLogout, username }) => (
  <nav className="navbar">
    <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className="logo" />
    <div className="navbar-right">
      <span className="user-username">{username}</span>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  </nav>
);

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

const Footer = () => (
  <footer className="footer">
    <p>&copy; {new Date().getFullYear()} ExpenSaver. All rights reserved.</p>
  </footer>
);

const Dashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [username, setUsername] = useState("");
  const [lastExpense, setLastExpense] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      navigate("/login");
      return;
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    fetchUserDetails();
    fetchLastExpense();
  }
);

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user");
      setUsername(res.data.username);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  const fetchLastExpense = async () => {
    try {
      const res = await axios.get("http://localhost:5000/last-expense");
      setLastExpense(res.data);
    } catch (err) {
      console.error("Error fetching last expense:", err);
    }
  };

  const handleAddExpense = async () => {
    if (!title || !amount) {
      alert("Title and Amount are required!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/add-expense", {
        title,
        amount: parseFloat(amount),
        quantity: quantity ? parseInt(quantity) : null,
      });
      setLastExpense(res.data);
      setTitle("");
      setAmount("");
      setQuantity("");
    } catch (err) {
      console.error("Error adding expense:", err);
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
          <h2>Welcome to Your Dashboard, {username}!</h2>
          {lastExpense ? (
            <div className="last-expense">
              <h3>Last Added Expense</h3>
              <table className="expense-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Amount</th>
                    <th>Quantity</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{lastExpense.title}</td>
                    <td>₹{lastExpense.amount}</td>
                    <td>{lastExpense.quantity || "-"}</td>
                    <td>{new Date(lastExpense.created_at).toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <p>No expenses added yet.</p>
          )}
          <h3>Add New Expense</h3>
          <div className="expense-form">
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <input type="number" placeholder="Quantity (optional)" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            <button onClick={handleAddExpense}>Add Expense</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;