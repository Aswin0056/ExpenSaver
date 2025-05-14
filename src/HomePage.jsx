import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
import "./Css/HomePage.css";
import { FaUserPlus, FaSignInAlt, FaPlusCircle, FaEye, FaTasks } from "react-icons/fa";
import Navbar from "./Navbar";
import Footer from "./Footer";

// const REACT_APP_API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const HomePage = () => {
  // const [successMessage, setSuccessMessage] = useState("");
  // const [errorMsg, setErrorMsg] = useState("");
  const [formData, setFormData] = useState({ name: "", gmail: "", comment: "" });
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const res = await fetch("https://studio-bd.onrender.com/api/get-comments");
      const data = await res.json();
      setComments(data.reverse()); // Show latest first
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://studio-bd.onrender.com/api/add-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // setSuccessMessage("Comment submitted ✅");
        setFormData({ name: "", gmail: "", comment: "" });
        fetchComments(); // Refresh comment list
        // setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        // setErrorMsg("Failed to submit comment ❌");
        // setTimeout(() => setErrorMsg(""), 3000);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      // setErrorMsg("Something went wrong 😢");
      // setTimeout(() => setErrorMsg(""), 3000);
    }
  };

  return (
  <div>
  <Navbar />
    <div className="homepage-container">
      
      {/* <img src={`${process.env.PUBLIC_URL}/Banner.webp`} alt="logo" className="banner" /> */}
      <div className="content-container">
        <div className="left-section">
          <img src={`${process.env.PUBLIC_URL}/only-logo.png`} alt="ExpenSaver Logo" className="large-logo" />
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

        {/* DOWNLOAD CARD */}
        <div className="download-card">
          <h3 style={{color:"goldenrod"}}>📱 Download Our App</h3>
          <p>Take Quotes Gram on the go. Available now on mobile platforms!</p>
          <a
            href="https://azhstudioofficial.online/download"
            className="download-button"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Download Now
          </a>
        </div>

       {/* 💬 Comments Section */}
      <div className="comments-section" style={{ marginTop: "3rem", maxWidth: "600px", marginInline: "auto" }}>
        <h3 style={{color:"goldenrod"}}>💬 Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map((comment, index) => (
            <div key={index} style={{ padding: "1rem", marginBottom: "1rem", textAlign: "left" }}>
              <img src={`${process.env.PUBLIC_URL}/users-logo.png`} alt="logo" className="users-logo" />
              <p className="comment-name" style={{ marginBottom: "0.25rem" }}><strong>{comment.name}</strong></p>
              <p style={{ color: "#555", fontSize: "0.8rem", marginLeft: "10px" }}>{comment.comment}</p>
            </div>
          ))
        )}
      </div>

      {/* 📝 Comment Form */}
      <div className="comment-box" style={{ marginTop: "2rem" }}>
        <h3>Leave a Comment</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
          <input type="email" name="gmail" placeholder="Your Gmail" value={formData.gmail} onChange={handleChange} required />
          <textarea name="comment" placeholder="Your Comment" rows="4" value={formData.comment} onChange={handleChange} required />
          <button type="submit">Submit Comment</button>
        </form>
      </div>


    </div>
    <Footer />
    </div>
  );
};

export default HomePage;
