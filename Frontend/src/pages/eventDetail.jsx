import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const eventsData = [
  {
    id: 1,
    title: "TechFest 2025",
    date: "Sept 15, 2025",
    description: "Annual robotics & tech showcase.",
    location: "City Convention Center",
    organizer: "Tech Club",
    image: "https://cdn.abcotvs.com/dip/images/13145252_041723-localish-LSH7057-ROBOTICSCLUB-WPVI-vid.jpg",
    participants: 120
  },
  {
    id: 2,
    title: "Robotics Club Meet",
    date: "Oct 5, 2025",
    description: "Club meeting and project showcase.",
    location: "Robotics Lab, University",
    organizer: "Robotics Club",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuqsFvrrX4Cf3iu-1S94hq9-480vKS2BYH3Q&s",
    participants: 45
  },
  {
    id: 3,
    title: "Innovation Challenge",
    date: "Nov 20, 2025",
    description: "Hackathon and robotics competitions.",
    location: "Innovation Hub",
    organizer: "Tech Society",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNp5xKBozBGd7TIVSAEgkVYuRpsr1_xIPR7w&s",
    participants: 75
  }
];

export default function EventDetail() {
  const { id } = useParams(); // get event id from URL
  const event = eventsData.find(e => e.id === parseInt(id));
  const [isRegistered, setIsRegistered] = useState(false);
  const [participants, setParticipants] = useState(event.participants);

  const handleRegister = () => {
    if (!isRegistered) {
      setParticipants(prev => prev + 1);
    } else {
      setParticipants(prev => prev - 1);
    }
    setIsRegistered(!isRegistered);
  };

  if (!event) return <p>Event not found</p>;

  return (
    <div className="event-detail-container">
      <Link to="/" className="nav-btn">← Back to Home</Link>
      <div className="event-detail-card">
        <img src={event.image} alt={event.title} className="event-detail-img" />
        <div className="event-detail-content">
          <h1>{event.title}</h1>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <p><strong>Organizer:</strong> {event.organizer}</p>
          <p>{event.description}</p>
          <p><strong>Registered Participants:</strong> {participants}</p>
          <button className="btn" onClick={handleRegister}>
            {isRegistered ? "Unregister" : "Register"}
          </button>
        </div>
      </div>
    </div>
  );
}