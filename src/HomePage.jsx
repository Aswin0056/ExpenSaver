import React from "react";
import { useNavigate } from "react-router-dom";
import "./Css/HomePage.css";
import { 
  FaUserPlus, FaSignInAlt, FaPlusCircle, FaEye, FaTasks, 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaDownload 
} from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="ExpenSaver Logo" className="homepage-logo" />
        </div>

        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div>

        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content-container">
        {/* Left: Logo */}
        <div className="left-section">
          <img src={`${process.env.PUBLIC_URL}/only logo.png`} alt="ExpenSaver Logo" className="large-logo" />
        </div>

        {/* Right: App Description */}
        <div className="right-section">
          <h2>Welcome to ExpenSaver</h2>
          <p>
            <strong>ExpenSaver</strong> is a simple and easy-to-use personal finance tracker designed to help you manage your daily expenses effortlessly.
          </p>
          <h3>How to Use ExpenSaver?</h3>
          <ul>
            <li><FaUserPlus /> <strong>Sign up</strong> for an account to get started.</li>
            <li><FaSignInAlt /> <strong>Log in</strong> to your secure dashboard.</li>
            <li><FaPlusCircle /> <strong>Add expenses</strong> with details like amount, category, and date.</li>
            <li><FaEye /> <strong>View</strong> your transactions and track spending patterns.</li>
            <li><FaTasks /> <strong>Manage</strong> your expenses by editing or deleting unnecessary entries.</li>
          </ul>
          <p>Start tracking your expenses today and take control of your finances!</p>

          {/* 🔽 Download Button 🔽 */}
          <div className="download-section">
            <h3>Download ExpenSaver App</h3>
            <p>Get the ExpenSaver app for a better experience on your mobile device.</p>
            <button className="download-btn">
              <FaDownload /> Download Now
            </button>
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
         
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
