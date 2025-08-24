import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ManageEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);
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

  const navigate = useNavigate();

  const showToast = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category,
      image: null,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingEvent) return;

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      const res = await fetch(
        `http://localhost:5000/api/events/update/${editingEvent._id || editingEvent.id}`,
        { method: "PUT", body: data }
      );
      if (!res.ok) throw new Error("Failed to update event");

      showToast("✅ Event updated successfully");
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      console.error(err);
      showToast("⚠️ Failed to update event", "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/events/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete event");

      showToast("✅ Event deleted");
      setEvents(events.filter((e) => e._id !== id && e.id !== id));
    } catch (err) {
      console.error(err);
      showToast("⚠️ Failed to delete event", "error");
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard-container">
      <div style={{ width: "100%", marginBottom: "20px", textAlign: "center" }}>
        <button className="btn" style={{ maxWidth: "200px" }} onClick={() => navigate("/admin")}>
          ← Back to Dashboard
        </button>
      </div>

      {notification && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            padding: "12px 20px",
            borderRadius: "8px",
            backgroundColor: notification.type === "success" ? "#4CAF50" : "#F44336",
            color: "#fff",
            zIndex: 9999,
          }}
        >
          {notification.message}
        </div>
      )}

      <h2>📅 Manage Events</h2>
      <div className="card-grid">
        {events.length === 0 && <p>No events available.</p>}

        {events.map((event) => (
          <div className="card" key={event._id || event.id}>
            {event.image && (
              <img
                src={event.image.startsWith("http") ? event.image : `http://localhost:5000/uploads/${event.image}`}
                alt={event.title}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "8px 8px 0 0" }}
              />
            )}

            <div className="card-content">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Date:</strong> {event.date} <br />
                <strong>Time:</strong> {event.time || "TBA"} <br />
                <strong>Location:</strong> {event.location || "TBA"}
              </p>
              <p>
                <strong>Category:</strong> {event.category || "General"}
              </p>

              <div
                className="card-actions"
                style={{ display: "flex", gap: "10px" }} // 👈 Added gap here
              >
                <button className="btn" onClick={() => handleEdit(event)}>
                  Edit
                </button>
                <button className="btn" onClick={() => handleDelete(event._id || event.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingEvent && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Edit Event</h2>
            <form onSubmit={handleUpdate} className="form-grid">
              <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
              <input type="time" name="time" value={formData.time} onChange={handleChange} />
              <input name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
              <input name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
              <input type="file" name="image" onChange={handleChange} />
              <div className="form-actions">
                <button type="submit" className="btn">
                  Save
                </button>
                <button type="button" className="btn" onClick={() => setEditingEvent(null)}>
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
