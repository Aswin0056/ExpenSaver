import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; 
import "./Css/Dashboard.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const Navbar = ({ handleLogout, username }) => (
  <nav className="navbar">
    <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className="logo" />
    <div className="navbar-right">
      <span className="user-username">{username || "User"}</span>
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


const Dashboard = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [quantity, setQuantity] = useState("");
  const [username, setUsername] = useState("");
  const [lastExpense, setLastExpense] = useState(null);
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchLastExpense = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      try {
        const response = await axios.get(`${API_BASE_URL}/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLastExpense(response.data.lastExpense || null);
      } catch (err) {
        if (err.response?.status === 401) {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("authToken");
          navigate("/login");
        } else {
          setError("Error fetching last expense.");
        }
      }
    };

    fetchLastExpense();
  }, [navigate]);

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
        {/* Footer Section */}
                  <footer className="footer-home">
                    <div className="footer-container-home">
                      <div className="footer-section-home">
                        <h4>About</h4>
                        <p>ExpenSaver is a personal finance tracker helping users manage their daily expenses efficiently.</p>
                      </div>
                      
                      <div className="footer-section-home">
                        <h4>Contact</h4>
                        <p>Email: <a href="mailto:support@expensaver.com">support@expensaver.com</a></p>
                        <p>Phone: <a href="tel:+1234567890">78250 . . . . .</a></p>
                      </div>
                      
                      <div className="footer-section-home">
                        <h4>Owner</h4>
                        <p>Developed by <strong>Aswin</strong></p>
                      </div>
                      
                      <div className="footer-section-home">
                        <h4>User Guide</h4>
                        <p>
                          <a href="/user-guide">Click here to learn how to use ExpenSaver</a>
                        </p>
                      </div>
                      
                      <div className="footer-section-home social-media">
                        <h4>Follow Us</h4>
                        <div className="social-icons">
                          <a href="https://www.facebook.com/share/15RVuyQBmi/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
                          <a href="https://www.instagram.com/azhvn.ix?igsh=MXg4b25vMDV1MGdxag==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                          <a href="https://in.linkedin.com/in/aswin-i-1543b0259?trk=people-guest_people_search-card" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
                        </div>
                      </div>
                      <p className="designed">Designed by <strong className="cursive">Lishoni Lenin</strong></p>
                    </div>
                  </footer>
    </div>
  );
};

export default Dashboard;
