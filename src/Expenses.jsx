import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Css/Expenses.css";
import Navbar from "./Navbar";

const Expenses = () => {
  const [sheets, setSheets] = useState([{ name: "Sheet 1", expenses: [] }]);
  const [currentSheetIndex, setCurrentSheetIndex] = useState(0);
  const [editingExpense, setEditingExpense] = useState(null);
  const [filter, setFilter] = useState("all");
  const [filterDate, setFilterDate] = useState("");
  const [filterMonth, setFilterMonth] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchExpenses = async () => {
      try {
        const res = await axios.get("https://es-backend-1.onrender.com/expenses", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSheets([{ name: "Sheet 1", expenses: res.data }]);
      } catch (err) {
        if (err.response?.status === 401) {
          localStorage.removeItem("authToken");
          navigate("/login");
        }
      }
    };

    fetchExpenses();

    const handleExpenseAdded = () => fetchExpenses();
    window.addEventListener("expenseAdded", handleExpenseAdded);

    return () => window.removeEventListener("expenseAdded", handleExpenseAdded);
  }, [navigate, token]);

  const handleEdit = (expense) => {
    setEditingExpense({ ...expense });
  };

  const handleInputChange = (e, field) => {
    setEditingExpense((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleUpdate = async () => {
    if (!editingExpense) return;

    try {
      await axios.put(
        `https://es-backend-1.onrender.com/update-expense/${editingExpense.id}`,
        editingExpense,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedExpenses = sheets[currentSheetIndex].expenses.map((exp) =>
        exp.id === editingExpense.id ? editingExpense : exp
      );

      updateCurrentSheetExpenses(updatedExpenses);
      setEditingExpense(null);
    } catch (err) {
      console.error("Error updating expense:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) return;

    try {
      await axios.delete(`https://es-backend-1.onrender.com/delete-expense/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const filtered = sheets[currentSheetIndex].expenses.filter((exp) => exp.id !== id);
      updateCurrentSheetExpenses(filtered);
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  const updateCurrentSheetExpenses = (newExpenses) => {
    const newSheets = [...sheets];
    newSheets[currentSheetIndex].expenses = newExpenses;
    setSheets(newSheets);
  };

  const addNewSheet = () => {
    setSheets((prev) => [...prev, { name: `Sheet ${prev.length + 1}`, expenses: [] }]);
    setCurrentSheetIndex(sheets.length);
  };

  const filteredExpenses = sheets[currentSheetIndex].expenses.filter((expense) => {
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

  const grandTotal = filteredExpenses.reduce(
    (total, exp) => total + exp.amount * (exp.quantity || 1),
    0
  );

  return (
    <div className="expenses-container">
      <Navbar />

      <div className="main-content">
        <div className="expenses-content">
          <div className="header">
            <h2>Expense History - {sheets[currentSheetIndex].name}</h2>
            <button className="add-sheet" onClick={addNewSheet}>+ Add Sheet</button>
          </div>

          <div className="sheet-tabs">
            {sheets.map((sheet, index) => (
              <button
                key={index}
                className={`sheet-tab ${index === currentSheetIndex ? "active" : ""}`}
                onClick={() => setCurrentSheetIndex(index)}
              >
                {sheet.name}
              </button>
            ))}
          </div>

          <div className="filter-bar">
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All</option>
              <option value="date">Filter by Date</option>
              <option value="month">Filter by Month</option>
            </select>
            {filter === "date" && (
              <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
            )}
            {filter === "month" && (
              <input type="month" value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} />
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
                      <td><input type="text" value={editingExpense.title} onChange={(e) => handleInputChange(e, "title")} /></td>
                      <td><input type="number" value={editingExpense.amount} onChange={(e) => handleInputChange(e, "amount")} /></td>
                      <td><input type="number" value={editingExpense.quantity || ""} onChange={(e) => handleInputChange(e, "quantity")} /></td>
                      <td>{(editingExpense.amount * (editingExpense.quantity || 1)).toFixed(2)}</td>
                      <td>{new Date(editingExpense.created_at).toLocaleString()}</td>
                      <td>
                        <button onClick={handleUpdate}>Update</button>
                        <button onClick={() => setEditingExpense(null)}>Cancel</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{expense.title}</td>
                      <td>{expense.amount}</td>
                      <td>{expense.quantity || "-"}</td>
                      <td>{(expense.amount * (expense.quantity || 1)).toFixed(2)}</td>
                      <td>{new Date(expense.created_at).toLocaleString()}</td>
                      <td>
                        <button onClick={() => handleEdit(expense)}>Edit</button>
                        <button onClick={() => handleDelete(expense.id)}>Delete</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
              <tr className="grand-total-row">
                <td colSpan="3"><strong>Grand Total</strong></td>
                <td><strong>₹ {grandTotal.toFixed(2)}</strong></td>
                <td colSpan="2"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <button onClick={() => navigate("/dashboard")}>Dashboard</button>
          <button onClick={() => navigate("/expenses")}>Expenses</button>
          <button onClick={() => navigate("/income")}>Income</button>
          <button onClick={() => navigate("/profile")}>Profile</button>
        </div>
        <p className="footer-text">
          © 2025 <strong style={{ color: 'black' }}>Azh</strong>
          <strong style={{ color: 'goldenrod' }}>Studio</strong>
        </p>
      </footer>
    </div>
  );
};

export default Expenses;