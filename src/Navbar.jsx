import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import "./Css/Navbar.css"; // Make sure this matches the updated class names

const Navbar = ({ search, setSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <nav className="banana-bar">

      <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="logo" className="apple-logo" />
     
      <div className="grape-group">
      <div className="mango-input">
        <input
          type="text"
          placeholder="Search..."
          className="pineapple-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        </div>
        
        <div className="mango-profile" onClick={toggleDropdown}>
          <FaUserCircle className="orange-icon" />
          {showDropdown && (
            <div className="kiwi-dropdown">
              <ul>
                <li onClick={() => navigate("/profile")}>Profile</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
