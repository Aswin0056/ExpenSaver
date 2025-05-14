import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../css/about.css";

export default function About() {
  return (
    <div>
    <Navbar />
    <div className="about-page" style={{ padding: "2rem", backgroundColor: "#f4f4f4", fontFamily: "'Poppins', sans-serif" }}>
      <h1>About Us</h1>
      <p>
        Welcome to our website! We are a passionate team dedicated to providing you with the best service.
        Our mission is to make your experience seamless, enjoyable, and worthwhile.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to revolutionize the way people experience technology by building user-friendly
        platforms that help them achieve their goals. Whether you're managing your expenses or exploring
        new tools, we're here to help you get the most out of every experience.
      </p>

      <h2>Our Vision</h2>
      <p>
        We envision a world where technology works harmoniously with people to create smarter solutions.
        Our products are designed with you in mind—simple, effective, and tailored to your needs.
      </p>

      <h2>Developer</h2>
      <p>
        Our development team is responsible for creating the innovative features you see here. Led by our lead developer, we focus on providing seamless user experiences and robust backend systems.
        <br />
        <strong>Name:</strong> Aswin Iyyappan
        <br />
        <strong>Role:</strong> Developer
        <br />
        <strong>Contact:</strong> azhstudio057@gmail.com
      </p>

      <h2>Owner</h2>
      <p>
        The owner of this platform ensures the business stays on track, with a focus on long-term growth and customer satisfaction.
        <br />
        <strong>Name:</strong> Aswin Iyyappan
        <br />
        <strong>Role:</strong> Owner & CEO
        <br />
        <strong>Contact:</strong> azhstudioofficial.outlook.com
      </p>

      <h2>Contact Us</h2>
      <p>
        If you have any questions or need further information, feel free to <a href="/contact">contact us</a>.
      </p>
    </div>
    <Footer />
    </div>
  );
}
