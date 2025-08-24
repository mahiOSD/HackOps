import React from 'react';


export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <h2>🛠️ Admin Dashboard</h2>
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