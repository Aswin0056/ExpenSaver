import React from "react";
import "./Css/OwnerInfo.css";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const OwnerInfo = () => {
  return (
    <div className="owner-container">
      <h1>About the Developer</h1>
      <div className="owner-details">
      <img src={`${process.env.PUBLIC_URL}/logo192.png`} alt="ExpenSaver Logo" className="owner-photo" />
      <div className="owner-text">
          <h2>Aswin Iyyappan</h2>
          <p>
            Hi! I'm Aswin, the developer of ExpenSaver. I'm passionate about web
            development and creating user-friendly applications to make life
            easier.
          </p>
          <p>
            Feel free to reach out for collaborations, feedback, or just to
            connect!
          </p>
          {/* <p className="SD-P"><strong className="SD-L">Lishoni Lenin </strong>: Supporting Director</p> */}
        </div>
      </div>

      <div className="contact-info">
        <h3>Contact Information</h3>
        <p>Email: <a href="mailto:support@expensaver.com">support@expensaver.com</a></p>
        <p>Phone: <a href="tel:+1234567890">+91 78250 . . . . .</a></p>
      </div>
      <h3>Follow Me</h3>
      <div className="social-links">
        
        <a href="https://www.facebook.com/share/15RVuyQBmi/" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="https://www.instagram.com/azhvn.ix?igsh=MXg4b25vMDV1MGdxag==" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://in.linkedin.com/in/aswin-i-1543b0259?trk=people-guest_people_search-card" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
      </div>
    </div>
  );
};

export default OwnerInfo;
