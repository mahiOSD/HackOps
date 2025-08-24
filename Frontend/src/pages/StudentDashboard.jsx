import React, { useState } from "react";
import "./StudentDashboard.css";

export default function StudentDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div className="dashboard-container">
    
      <header className="topbar">
        <button
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1>🎓 Student Dashboard</h1>
      </header>

      <nav className={`side-menu ${menuOpen ? "show" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ×
        </button>
        <button onClick={() => setMenuOpen(false)}>All Events</button>
        <button onClick={() => setMenuOpen(false)}>My Events</button>
        <button onClick={() => setMenuOpen(false)}>Profile</button>
        <button className="logout" onClick={handleLogout}>Logout</button>
      </nav>

      <main className="main-content"></main>
    </div>
  );
}
