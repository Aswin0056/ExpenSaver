import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Css/HomePage.css";
import { 
  FaUserPlus, FaSignInAlt, FaPlusCircle, FaEye, FaTasks, 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPaperPlane 
} from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const HomePage = () => {
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [name, setName] = useState("");  // New state for name input
  const [email, setEmail] = useState("");  // New state for email input
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        console.log("Fetching comments from:", `${API_BASE_URL}/comments`); // Debugging
        const response = await axios.get(`${API_BASE_URL}/comments`);
        console.log("Fetched comments:", response.data); // Debugging
        setComments(response.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError("Error fetching comments.");
      }
    };
  
    fetchComments();
  }, []);
  

  const handleCommentSubmit = async () => {
    if (!name || !email || !newComment.trim()) {
      alert("Please fill in all fields.");
      return;
    }
  
    const commentData = { name, email, text: newComment };
    console.log("Sending data:", commentData); // Debugging
  
    try {
      const response = await axios.post(`${API_BASE_URL}/comments`, commentData);
      console.log("Response:", response.data);
      setComments([...comments, response.data]); // Update UI
      setNewComment("");
      setName("");
      setEmail("");
    } catch (error) {
      console.error("Error submitting comment:", error.response ? error.response.data : error.message);
      setError("Error submitting comment.");
    }
  };

  return (
    <div className="homepage-container">
      <nav className="navbar">
        <div className="logo-container">
          <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="ExpenSaver Logo" className="homepage-logo" />
        </div>
        {/* <div className="search-container">
          <input type="text" placeholder="Search..." className="search-bar" />
        </div> */}
        <div className="nav-buttons">
          <button className="login-btn" onClick={() => navigate("/login")}>Login</button>
          <button className="register-btn" onClick={() => navigate("/register")}>Register</button>
        </div>
      </nav>
      {/* <img src={`${process.env.PUBLIC_URL}/Banner.webp`} alt="logo" className="banner" /> */}
      <div className="content-container">
        <div className="left-section">
          <img src={`${process.env.PUBLIC_URL}/only logo.png`} alt="ExpenSaver Logo" className="large-logo" />
        </div>

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
        </div>
      </div>

      {/* Comment Section */}
      <div className="comment-section">
        <h3>Leave a Comment</h3>
        <input
          type="text"
          className="gmail-input"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          className="gmail-input"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <textarea
          className="comment-input"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-submit" onClick={handleCommentSubmit}>
          <FaPaperPlane /> Submit
        </button>
        {error && <p className="error-message">{error}</p>}

        <div className="comments-container">
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment, index) => (
              <div key={index} className="comment-item">
                <p><img src={`${process.env.PUBLIC_URL}/users-logo.png`} alt="logo" className="users-logo" /><strong>{comment.name}</strong></p>
                <p>{comment.text}</p>
                <span className="comment-date">{new Date(comment.created_at).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <a
  href="/app-debug.apk"
  download
  style={{
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px'
  }}
>
  📱 Download Android App (APK)
</a>


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
            <p><a href="/user-guide">Click here to learn how to use ExpenSaver</a></p>
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
