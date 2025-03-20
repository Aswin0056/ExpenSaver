import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import Expenses from "./Expenses";
import Income from "./Income";
import HomePage from "./HomePage";

function App() {
    const [loading, setLoading] = useState(false);

    // Use useCallback to prevent unnecessary re-renders
    const handleLoading = useCallback(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1000); // Simulate loading for 1 second
    }, []);

    return (
        <Router>
            <PageLoader handleLoading={handleLoading} />
            
            {/* Loader Overlay */}
            {loading && (
                <div style={styles.overlay}>
                    <img src={`${process.env.PUBLIC_URL}/loading.gif`} alt="loading..." style={styles.loader} />
                </div>
            )}

            {/* Main content with blur effect when loading */}
            <div style={loading ? styles.blurredContent : styles.normalContent}>
                <Routes>
                    <Route path="/FR-Testing" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/expenses" element={<Expenses />} />
                    <Route path="/income" element={<Income />} />
                </Routes>
            </div>
        </Router>
    );
}

// Handles loading when route changes
const PageLoader = ({ handleLoading }) => {
    const location = useLocation();

    useEffect(() => {
        handleLoading();
    }, [location, handleLoading]);

    return null;
};

// Styles
const styles = {
    loader: {
        width: "80px",
        height: "80px",
    },
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(255, 255, 255, 0.5)", // Light transparent overlay
        backdropFilter: "blur(5px)", // Blurred background effect
        zIndex: 1000,
    },
    blurredContent: {
        filter: "blur(5px)", // Apply blur when loading
        pointerEvents: "none", // Disable interactions
        transition: "filter 0.3s ease-in-out",
    },
    normalContent: {
        transition: "filter 0.3s ease-in-out",
    },
};

export default App;
