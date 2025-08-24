import React from "react";
import { Link } from "react-router-dom";
import robotGif from "../assets/robot2.gif";

export default function Register() {
  return (
    <div className="auth-page">
         
          <div className="auth-illustration">
            <img
              src={robotGif} 
              alt="Robot illustration"
              className="robot-illustration"
            />
          </div>

      <div className="auth-card">
        <h2 className="auth-title">Register</h2>
        <form className="auth-form">
          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter name" required />
          </div>
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
          <button type="submit" className="btn-animated">Register</button>
        </form>
        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
