import React, { useState } from "react";
import "./Css/Income.css";
import { FaEdit } from "react-icons/fa";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];


const Income = ({ expenses = {} }) => {
  const [viewMode, setViewMode] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("January");
  const [amount, setAmount] = useState("");
  const [netIncome, setNetIncome] = useState(null);

  const handleSubmit = () => {
    if (amount.trim() !== "") {
      const expenseForMonth = expenses[selectedMonth] || 0;
      setNetIncome(parseFloat(amount) - expenseForMonth);
      setViewMode(true);
    }
  };

  return (
    <div className="expenses-container">
    <Navbar />
    <Sidebar />
      <div className="income-bar">
        {viewMode ? (
          <div className="display-income">
            <span><strong>Month:</strong> {selectedMonth} | <strong>Income:</strong> ${amount} | <strong>Net:</strong> ${netIncome}</span>
            <FaEdit className="edit-icon" onClick={() => setViewMode(false)} />
          </div>
        ) : (
          <div className="input-income">
            <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
              {months.map((month) => (
                <option key={month} value={month}>{month}</option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>
          </div>
        )}
      </div>

      <div style={{marginLeft: "45px"}} className="under-construction">
        🚧 This section is currently under construction. Stay tuned for updates! 🚀
      </div>

      <div className="main-content">
   
      </div>
      <h6 style={{ fontSize: "6px", textAlign: "center", marginRight: "250px"}}>
        Powered by <strong style={{ color: 'black' }}>Azh</strong>
        <strong style={{ color: 'goldenrod' }}>Studio</strong>
      </h6>
    </div>
  );
};

export default Income;
