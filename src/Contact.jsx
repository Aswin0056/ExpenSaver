import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../css/contact.css"; // adjust path if needed


export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");
  const [Errorstatus, setErrorStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://studio-bd.onrender.com/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus("Message sent ✅");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setErrorStatus("Failed to send message ❌");
      }

      setTimeout(() => {
        setErrorStatus("");
      }, 3000);
    } catch (err) {
      console.error("Error:", err);
      setErrorStatus("Something went wrong 😢");

      setTimeout(() => {
        setErrorStatus("");
      }, 3000);
    }
  };

  return (
    <div>
    <Navbar />
    <div className="contact-container"  style={{fontFamily: "'Poppins', sans-serif"}} >
      <h2>📬 Contact Us</h2>
      {status && <p className="floating-success">{status}</p>}
      {Errorstatus && <p className="floating-error">{Errorstatus}</p>}
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <button type="submit">Send Message</button>
      </form>
      <p style={{fontSize: "0.7rem"}}>📩 Please enter the correct contact information. You’ll receive an email from us shortly! 😊</p>
      {/* <p className="owner-label" style={{marginTop: "200px"}}>
        Created by <span>Aswin</span>
      </p> */}
      </div>
      <Footer />
    </div>
  );
}
