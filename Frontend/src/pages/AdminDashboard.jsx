import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="left-header">
          <FaBars
            className="menu-icon"
            size={26}
            onClick={() => setMenuOpen(true)}
            style={{ cursor: "pointer" }}
          />
          <h2>🛠️ Admin Dashboard</h2>
        </div>
      </div>

      <div className={`sidebar ${menuOpen ? "open" : ""}`}>
        <button className="close-btn" onClick={() => setMenuOpen(false)}>
          ✖
        </button>
        <button onClick={() => navigate("/admin-dashboard")}>Dashboard</button>
        <button onClick={() => navigate("/create-event")}>Create Event</button>
        <button onClick={handleLogout}>Logout</button>
      </div>

      {menuOpen && (
        <div className="overlay" onClick={() => setMenuOpen(false)}></div>
      )}

      <div className="stats-grid">
        <div className="stat-card">Total Events: <strong>12</strong></div>
        <div className="stat-card">Upcoming Events: <strong>4</strong></div>
        <div className="stat-card">Total Attendees: <strong>340</strong></div>
      </div>

      <div className="card-grid">
        <div className="card">
          <h3>Create Event</h3>
          <p>Add a new event with details and schedule.</p>
          <button className="btn">+ Create</button>
        </div>
        <div className="card">
          <h3>Manage Events</h3>
          <p>Edit or delete your existing events.</p>
          <button className="btn">Manage</button>
        </div>
      </div>
    </div>
  );
}
