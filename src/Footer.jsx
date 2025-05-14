import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundImage: `url('https://www.transparenttextures.com/patterns/cubes.png'), linear-gradient(15deg, grey 40%, black 55%)`,
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        color: "#fff",
        padding: "2rem",
        borderTop: "2px solid #fff",
        marginTop: "4rem",
        borderTopLeftRadius: "24px",
        borderTopRightRadius: "24px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {/* Logo and Brand Name */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <img
            src="/only-logo.png" // Replace with actual path or use a public URL
            alt="ExpenSaver Logo"
            style={{ width: "150px", height: "150px", borderRadius: "8px" }}
          />
          {/* <h2 style={{ margin: 0 }}>
            <strong style={{ color: "white" }}>Expen</strong>
            <strong style={{ color: "goldenrod" }}>Saver</strong>
          </h2> */}
        </div>

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: "1rem" }}>
          <Link
            to="/about"
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 215, 0, 0.1)",
              border: "1px solid goldenrod",
              transition: "0.3s",
            }}
          >
            About
          </Link>
          <Link
            to="/contact"
            style={{
              color: "#fff",
              textDecoration: "none",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              backgroundColor: "rgba(255, 215, 0, 0.1)",
              border: "1px solid goldenrod",
              transition: "0.3s",
            }}
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="yearcompany" style={{ textAlign: "center" }}>
        <p style={{ fontSize: "1rem", marginBottom: "0.4rem", color: "white"}}>
          © {new Date().getFullYear()}
          <strong style={{ color: "white", fontWeight: "600" }}> Expen</strong>
          <strong style={{ color: "goldenrod", fontWeight: "600" }}>Saver</strong>. All rights reserved.
        </p>
        <p style={{ fontSize: "0.75rem", opacity: 0.8 }}>
          <a
            alt="Azh Studio"
            href="https://azhstudioofficial.online"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "white" }}
          >
            Built with 🤍 by <span style={{ color: "goldenrod" }}>Azh</span><span style={{ color: "black" }}>Studio</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
