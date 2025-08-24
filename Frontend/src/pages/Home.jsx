import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const events = [
    {
      id: 1,
      title: "TechFest 2025",
      date: "Sept 15, 2025",
      description: "Annual robotics & tech showcase.",
      image: "https://cdn.abcotvs.com/dip/images/13145252_041723-localish-LSH7057-ROBOTICSCLUB-WPVI-vid.jpg" 
    },
    {
      id: 2,
      title: "Robotics Club Meet",
      date: "Oct 5, 2025",
      description: "Club meeting and project showcase.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuqsFvrrX4Cf3iu-1S94hq9-480vKS2BYH3Q&s" 
    },
    {
      id: 3,
      title: "Innovation Challenge",
      date: "Nov 20, 2025",
      description: "Hackathon and robotics competitions.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNp5xKBozBGd7TIVSAEgkVYuRpsr1_xIPR7w&s" 
    }
  ];

  return (
    <div className="home-container">
      <nav className="navbar">
        <h2 className="logo">RoboEvents</h2>
        <div className="nav-links">
          <Link to="/" className="nav-btn">Home</Link>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/register" className="nav-btn">Register</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to RoboEvents</h1>
          <p>Discover, register, and manage your favorite events all in one place.</p>
          <div className="hero-buttons">
            <Link to="/login" className="btn">Get Started</Link>
            <Link to="/register" className="btn-outline">Join Now</Link>
          </div>
        </div>
      </section>

      <section className="featured">
        <h2>Upcoming Events</h2>
        <div className="card-grid">
          {events.map(event => (
            <div className="event-card" key={event.id}>
              <img src={event.image} alt={event.title} className="event-img" />
              <div className="event-content">
                <h3>{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p>{event.description}</p>
                <div className="card-buttons">
                  {/* Navigate to Event Detail Page */}
                  <Link to={`/event/${event.id}`} className="btn">
                    View Details
                  </Link>
                  
                
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
