import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const events = [
    {
      id: 1,
      title: "TechFest 2025",
      date: "Sept 15, 2025",
      description: "Annual robotics & tech showcase.",
      image:
        "https://news.csun.edu/wp-content/uploads/2025/01/Tech_Fest_Events.png",
    },
    {
      id: 2,
      title: "Robotics Club Meet",
      date: "Oct 5, 2025",
      description: "Club meeting and project showcase.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoYcWYOVR-ArfIlDmISES9NwcQJvbU40yThg&s",
    },
    {
      id: 3,
      title: "Innovation Challenge",
      date: "Nov 20, 2025",
      description: "Hackathon and robotics competitions.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWsdnePlcxACLMoxIagsH7gZsxlV8AsrLyng&s",
    },
  ];

  return (
    <div className={`home-container ${darkMode ? "dark" : ""}`}>
      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">RoboEvents</h2>
        <div className="nav-links">
          <Link to="/" className="nav-btn">Home</Link>
          <Link to="/login" className="nav-btn">Login</Link>
          <Link to="/register" className="nav-btn">Register</Link>
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌙 Dark" : "☀️ Light"}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
<section className="hero">
  <div className="hero-content animate-fade">
    <h1>Welcome to <span className="highlight">RoboEvents</span></h1>
    <p>Discover, register, and manage your favorite events all in one place.</p>
    <div className="hero-buttons">
      <Link to="/login" className="btn">🚀 Get Started</Link>
      <Link to="/register" className="btn-outline">✨ Join Now</Link>
    </div>
  </div>
  <div className="hero-image">
    <img 
      src="https://www.21kschool.com/in/wp-content/uploads/sites/4/2025/04/Virtual-robots-The-power-of-learning-from-home.png"
      alt="Robotics Hero"
    />
  </div>
</section>



      {/* Featured Events */}
      <section className="featured">
        <h2 className="animate-slide">Upcoming Events</h2>
        <div className="card-grid">
          {events.map((event) => (
            <div className="event-card animate-zoom" key={event.id}>
              <img src={event.image} alt={event.title} className="event-img" />
              <div className="event-content">
                <h3>{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p>{event.description}</p>
                <button className="btn">Register</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
