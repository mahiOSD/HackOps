import React from "react";
import { Link } from "react-router-dom";
import robotGif from "../assets/robot1.gif"; // import korcho

export default function Login() {
  return (
    <div className="auth-page">
      {/* Left side image */}
      <div className="auth-illustration">
        <img
          src={robotGif} // ekhane import variable use korte hobe
          alt="Robot illustration"
          className="robot-illustration"
        />
      </div>

      {/* Right side login box */}
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form className="auth-form">
          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter email" required />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Enter password" required />
          </div>
          <div className="input-group">
            <label>Role</label>
            <select required>
              <option value="">Select role</option>
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-animated">
            Login
          </button>
        </form>
        <p className="register-link">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}
