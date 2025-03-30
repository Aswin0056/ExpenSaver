import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/Income.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEdit, FaCalendarAlt } from "react-icons/fa";

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const Navbar = ({ search, setSearch, selectedDate, setSelectedDate }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <nav className="navbar">
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

      <div className="main-content">
        <Sidebar />
      </div>

      {/* Footer Section */}
      <footer className="footer-income">
        <div className="footer-container-income">
          <div className="footer-section-income">
            <h4>About</h4>
            <p>ExpenSaver is a personal finance tracker helping users manage their daily expenses efficiently.</p>
          </div>
          
          <div className="footer-section-income">
            <h4>Contact</h4>
            <p>Email: <a href="mailto:support@expensaver.com">support@expensaver.com</a></p>
            <p>Phone: <a href="tel:+1234567890">78250 . . . . .</a></p>
          </div>
          
          <div className="footer-section-income">
            <h4>Owner</h4>
            <p>Developed by <strong>Aswin</strong></p>
          </div>
          
          <div className="footer-section-income">
            <h4>User Guide</h4>
            <p>
              <a href="/user-guide">Click here to learn how to use ExpenSaver</a>
            </p>
          </div>
          
          <div className="footer-section-income social-media">
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

export default Income;