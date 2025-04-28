import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Css/Expenses.css";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Expenses = () => {
  
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
    <Navbar />
    <Sidebar />
      <div className="main-content">
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
      <h6 style={{ fontSize: "6px", textAlign: "center", marginRight: "250px"}}>
        Powered by <strong style={{ color: 'black' }}>Azh</strong>
        <strong style={{ color: 'goldenrod' }}>Studio</strong>
      </h6>
    </div>
  );
};

export default Expenses;
