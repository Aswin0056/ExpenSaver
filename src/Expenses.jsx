import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Css/Expenses.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Navbar = ({ search, setSearch }) => (
  <nav className="navbar-E">
    <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className="logo-E" />
    <input
      type="text"
      placeholder="Search expenses..."
      className="search-input"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
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


const Expenses = () => {
  const [search, setSearch] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filter, setFilter] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      console.error("No auth token found. Redirecting to login...");
      navigate("/login");
      return;
    }

    const fetchExpenses = async () => {
      try {
        const res = await axios.get("https://es-backend-1.onrender.com/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Expenses Fetched:", res.data);
        setExpenses(res.data);
      } catch (err) {
        console.error("Error fetching expenses:", err.response?.data?.error || err.message);
        if (err.response?.status === 401) {
          console.log("Unauthorized! Redirecting to login...");
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      }
    };

    fetchExpenses();

    const handleExpenseAdded = () => fetchExpenses();
    window.addEventListener("expenseAdded", handleExpenseAdded);

    return () => {
      window.removeEventListener("expenseAdded", handleExpenseAdded);
    };
  }, [navigate, token]);

  const grandTotal = expenses.reduce(
    (total, expense) => total + expense.amount * (expense.quantity || 1),
    0
  );

  const handleEdit = (expense) => {
    setEditingExpense({ ...expense });
  };

  const handleInputChange = (e, field) => {
    setEditingExpense((prevExpense) => ({
      ...prevExpense,
      [field]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    if (!editingExpense) return;

    try {
      await axios.put(
        `https://es-backend-1.onrender.com/update-expense/${editingExpense.id}`,
        editingExpense,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setExpenses((prevExpenses) =>
        prevExpenses.map((exp) =>
          exp.id === editingExpense.id ? editingExpense : exp
        )
      );
      setEditingExpense(null);
    } catch (err) {
      console.error("Error updating expense:", err.response?.data?.error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      await axios.delete(`https://es-backend-1.onrender.com/delete-expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses((prevExpenses) => prevExpenses.filter((exp) => exp.id !== id));
    } catch (err) {
      console.error("Error deleting expense:", err.response?.data?.error);
    }
  };

  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.created_at);
    if (filter === "date" && filterDate) {
      return expenseDate.toISOString().split("T")[0] === filterDate;
    }
    if (filter === "month" && filterMonth) {
      return (
        expenseDate.getFullYear() === parseInt(filterMonth.split("-")[0]) &&
        expenseDate.getMonth() + 1 === parseInt(filterMonth.split("-")[1])
      );
    }
    return true;
  });

  return (
    <div className="expenses-container">
      <Navbar search={search} setSearch={setSearch} />
      <div className="main-content">
        <Sidebar />
        <div className="expenses-content">
          <h2>Expense History</h2>
          
          <div className="filter-bar">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="date">Filter by Date</option>
              <option value="month">Filter by Month</option>
            </select>
            {filter === "date" && (
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            )}
            {filter === "month" && (
              <input
                type="month"
                value={filterMonth}
                onChange={(e) => setFilterMonth(e.target.value)}
              />
            )}
          </div>
          
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Amount (₹)</th>
                <th>Quantity</th>
                <th>Total (₹)</th>
                <th>Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
  {filteredExpenses.map((expense) => (

                  <tr key={expense.id}>
                    {editingExpense?.id === expense.id ? (
                      <>
                      
                        <td>
                          <input
                            type="text"
                            value={editingExpense.title}
                            onChange={(e) => handleInputChange(e, "title")}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editingExpense.amount}
                            onChange={(e) => handleInputChange(e, "amount")}
                          />
                        </td>
                        <td>
                          <input
                            type="number"
                            value={editingExpense.quantity || ""}
                            onChange={(e) => handleInputChange(e, "quantity")}
                          />
                        </td>
                      
                        <td>
                          {(editingExpense.amount * (editingExpense.quantity || 1)).toFixed(2)}
                        </td>
                        <td>{new Date(editingExpense?.created_at).toLocaleString()}</td>
                        <td className="action-button">
                          <button className="update-button" onClick={handleUpdate}>Update</button>
                          <button className="cancel-button" onClick={() => setEditingExpense(null)}>Cancel</button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td>{expense.title}</td>
                        <td>{expense.amount}</td>
                        <td>{expense.quantity || "-"}</td>
                        <td>{(expense.amount * (expense.quantity || 1)).toFixed(2)}</td>
                        <td>{new Date(expense.created_at).toLocaleString()}</td>
                        <td className="action-button">
                          <button className="edit-button" onClick={() => handleEdit(expense)}>Edit</button>
                          <button className="delete-button" onClick={() => handleDelete(expense.id)}>Delete</button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
                 <tr className="grand-total-row">
                <td colSpan="3"><strong>Grand Total</strong></td>
                <td><strong>₹ {grandTotal.toFixed(2)}</strong></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
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
                  <p>Developed by <strong style={{"fontFamily":'cursive'}}>Aswin</strong></p>
            <h5><a className="more-info" href="/ownerinfo">More Info</a></h5>
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
                
              </div>
            </footer>
    </div>
  );
};

export default Expenses;
