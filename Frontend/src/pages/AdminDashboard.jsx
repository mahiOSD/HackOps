import React, { useState } from "react";

export default function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", formData);
    setShowForm(false);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
      image: null,
    });
  };

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
          <button className="btn" onClick={() => setShowForm(true)}>+ Create</button>
        </div>
        <div className="card">
          <h3>Manage Events</h3>
          <p>Edit or delete your existing events.</p>
          <button className="btn">Manage</button>
        </div>
      </div>

      
      {showForm && (
        <div className="modal-overlay">
          <div className="modal theme-inherit">
            <div className="modal-header">
              <h2>Create New Event</h2>
              <button className="close-btn" onClick={() => setShowForm(false)} aria-label="Close">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input id="title" name="title" type="text" placeholder="Enter event title" value={formData.title} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" placeholder="Enter event description" value={formData.description} onChange={handleChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input id="time" name="time" type="time" value={formData.time} onChange={handleChange} required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input id="location" name="location" type="text" placeholder="Enter location" value={formData.location} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input id="category" name="category" type="text" placeholder="e.g. Workshop, Seminar" value={formData.category} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label htmlFor="image">Upload Image (optional)</label>
                <input id="image" name="image" type="file" accept="image/*" onChange={handleChange} />
              </div>

              <div className="form-actions">
  <button type="submit" className="btn">Submit</button>
  <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
</div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
