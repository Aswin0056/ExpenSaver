import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Css/ProfileSettings.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.username);

        const response = await axios.get(`${API_BASE_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setPreviewImage(response.data.profileImage);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("Unauthorized! Please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    if (profileImage) {
      formData.append("profileImage", profileImage);
    }

    try {
      await axios.put(`${API_BASE_URL}/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="profile-settings-container">
      <h2>Profile Settings</h2>

      <div className="profile-image-section">
        <img src={previewImage || `${process.env.PUBLIC_URL}/profile-logo.png`} alt="Profile" className="profile-preview" />
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      <div className="username-section">
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>

      <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default ProfileSettings;
