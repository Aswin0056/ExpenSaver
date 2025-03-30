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

  // Fetch comments from the backend
  useEffect(() => {
    axios.get(`${API_BASE_URL}/comments`)
      .then(response => setComments(response.data))
      .catch(error => console.error("Error fetching comments:", error));
  }, []);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
        alert("Comment cannot be empty!");
        return;
    }

    try {
        const response = await axios.post(`${API_BASE_URL}/comments`, { text: newComment });
        setComments([...comments, response.data]); // Update UI
        setNewComment(""); // Clear input
    } catch (error) {
        alert("Error submitting comment");
    }
  };

  return (
    <div className="homepage-container">
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

      <div className="comment-section">
        <h3>Leave a Comment</h3>
        <textarea
          className="comment-input"
          placeholder="Write your comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button className="comment-submit" onClick={handleCommentSubmit}>
          <FaPaperPlane /> Submit
        </button>

        <div className="comments-container">
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="comment-item">
                <p>{comment.text}</p>
                <span className="comment-date">{new Date(comment.date).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>

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
            <h5><a  className="more-info" href="/ownerinfo">More Info</a></h5>
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
