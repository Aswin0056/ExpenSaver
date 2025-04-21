import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Income.css";
import { FaEdit, FaCalendarAlt } from "react-icons/fa";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const Navbar = ({ search, setSearch, selectedDate, setSelectedDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <nav className="navbar-I">
      <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className="logo" />
      <div className="SC-Nav">
      <input
        type="text"
        placeholder="Search expenses..."
        className="search-input"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FaCalendarAlt className="calendar-icon" onClick={() => setShowCalendar(!showCalendar)} />
      {showCalendar && (
        <input 
          type="date" 
          className="calendar-input" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      )}
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

const Income = ({ expenses = {} }) => {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
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
      <Navbar search={search} setSearch={setSearch} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      
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

      <div className="under-construction">
  🚧 This section is currently under construction. Stay tuned for updates! 🚀
</div>

      <div className="main-content">
        <Sidebar />
      </div>


    </div>
  );
};

export default Income;