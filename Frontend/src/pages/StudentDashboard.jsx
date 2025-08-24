import React from 'react';


export default function StudentDashboard() {
  return (
    <div className="dashboard-container">
      <h2>🎓 Student Dashboard</h2>
      <div className="card-grid">
        <div className="card">
          <h3>My Events</h3>
          <p>You are registered for 3 upcoming events.</p>
          <button className="btn">View My Events</button>
        </div>
        <div className="card">
          <h3>All Events</h3>
          <p>Browse and register for exciting upcoming events.</p>
          <button className="btn">Explore Events</button>
        </div>
        <div className="card">
          <h3>Profile</h3>
          <p>Update your profile information & preferences.</p>
          <button className="btn">Edit Profile</button>
        </div>
      </div>
    </div>
  );
}