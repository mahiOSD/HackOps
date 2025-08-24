import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [participants, setParticipants] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    student_name: "",
    email: "",
    contact_number: "",
    semester: "",
    department: "",
  });

  // Fetch event details
  useEffect(() => {
    fetch(`http://localhost:5000/api/events/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch event details");
        return res.json();
      })
      .then((data) => {
        setEvent(data);
        setParticipants(data.participants || 0); // adjust if backend returns participant count
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load event details.");
        setLoading(false);
      });
  }, [id]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Registration failed");
      }

      alert("Registration successful!");
      setParticipants((prev) => prev + 1);
      setShowForm(false);
      setFormData({
        student_name: "",
        email: "",
        contact_number: "",
        semester: "",
        department: "",
      });
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <div className="event-detail-container">
      <Link to="/events" className="nav-btn">← Back to Events</Link>
      <div className="event-detail-card">
        {event.image && (
          <img
            src={
              event.image.startsWith("http")
                ? event.image
                : `http://localhost:5000/uploads/${event.image}`
            }
            alt={event.title}
            className="event-detail-img"
          />
        )}
        <div className="event-detail-content">
          <h1>{event.title}</h1>
          <p>{event.description}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Time:</strong> {event.time || "TBA"}</p>
          <p><strong>Location:</strong> {event.location || "TBA"}</p>
          <p><strong>Category:</strong> {event.category || "General"}</p>
          <p><strong>Registered Participants:</strong> {participants}</p>
          <button className="btn" onClick={() => setShowForm(true)}>Register</button>
        </div>
      </div>

      {/* Registration Form Modal */}
      {showForm && (
        <div className="modal">
          <div className="modal-content">
            <h2>Register for {event.title}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="student_name"
                placeholder="Your Name"
                value={formData.student_name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="contact_number"
                placeholder="Contact Number"
                value={formData.contact_number}
                onChange={handleChange}
              />
              <input
                type="text"
                name="semester"
                placeholder="Semester"
                value={formData.semester}
                onChange={handleChange}
              />
              <input
                type="text"
                name="department"
                placeholder="Department"
                value={formData.department}
                onChange={handleChange}
              />
              <button type="submit" className="btn">Submit</button>
              <button type="button" className="btn" onClick={() => setShowForm(false)}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
