import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  const [showDrawer, setShowDrawer] = useState(false);
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
  const [notification, setNotification] = useState(null);
  const [events, setEvents] = useState([]);
  const [totalAttendees, setTotalAttendees] = useState(0);
  const navigate = useNavigate();

  // ✅ Fetch events + attendees
  const fetchStats = async () => {
    try {
      // All events
      const eventsRes = await fetch("http://localhost:5000/api/events");
      if (!eventsRes.ok) throw new Error("Failed to fetch events");
      const eventsData = await eventsRes.json();
      setEvents(eventsData);

      // Total attendees (sum of attendees field from all events)
      let attendeesSum = 0;
      eventsData.forEach((e) => {
        if (Array.isArray(e.attendees)) {
          attendeesSum += e.attendees.length;
        } else if (typeof e.attendees === "number") {
          attendeesSum += e.attendees;
        }
      });
      setTotalAttendees(attendeesSum);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  // Show toast
  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) data.append(key, value);
      });

      const response = await fetch("http://localhost:5000/api/events/add", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        const errorResult = await response.json();
        showToast(
          `❌ Error: ${errorResult.error || "Something went wrong"}`,
          "error"
        );
        return;
      }

      await response.json();
      showToast("✅ Event created successfully!", "success");

      // Refresh stats
      fetchStats();

      // Reset form
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
    } catch (err) {
      console.error("Request failed", err);
      showToast("⚠️ Failed to connect to server.", "error");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.clear();
    sessionStorage.clear();

    showToast("✅ Logged out successfully", "success");
    navigate("/login");
  };

  // ✅ Upcoming events count (filter by date)
  const upcomingEvents = events.filter((e) => new Date(e.date) > new Date());

  return (
    <div className="dashboard-container">
      {/* Hamburger & Drawer */}
      <div className="hamburger" onClick={() => setShowDrawer(true)}>
        ☰
      </div>

      <div className={`side-drawer ${showDrawer ? "open" : ""}`}>
        <div className="drawer-header">
          <button
            className="close-drawer-btn"
            onClick={() => setShowDrawer(false)}
          >
            ✕
          </button>
        </div>
        <ul>
          <li onClick={() => setShowDrawer(false)}>Dashboard</li>
          <li
            onClick={() => {
              setShowForm(true);
              setShowDrawer(false);
            }}
          >
            Create Event
          </li>
          <li onClick={() => navigate("/manage-events")}>Manage Events</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      {/* Toast Notification */}
      {notification && (
        <div
          className={`toast ${notification.type}`}
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor:
              notification.type === "success" ? "#4CAF50" : "#F44336",
            color: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 9999,
          }}
        >
          {notification.message}
        </div>
      )}

      {/* Main Stats */}
      <h2>🛠️ Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          Total Events: <strong>{events.length}</strong>
        </div>
        <div className="stat-card">
          Upcoming Events: <strong>{upcomingEvents.length}</strong>
        </div>
        <div className="stat-card">
          Total Attendees: <strong>{totalAttendees}</strong>
        </div>
      </div>

      {/* Create Event Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Create New Event</h2>
              <button
                className="close-btn"
                onClick={() => setShowForm(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="Enter event title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Enter event description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="time">Time</label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  placeholder="Enter location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category</label>
                <input
                  id="category"
                  name="category"
                  type="text"
                  placeholder="e.g. Workshop, Seminar"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="image">Upload Image (optional)</label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={handleChange}
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
