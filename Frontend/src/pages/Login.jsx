import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setLoggedIn(true);
    } else {
      alert(data.error);
    }
  } catch (err) {
    console.error(err);
  }
};



  const goToDashboard = () => {
    if (role === 'student') navigate('/student');
    else navigate('/admin');
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      {!loggedIn ? (
        <form onSubmit={handleLogin} className="auth-form">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn">Login</button>
        </form>
      ) : (
        <button className="btn" onClick={goToDashboard}>
          {role === 'student' ? 'Go to Student Dashboard' : 'Go to Admin Dashboard'}
        </button>
      )}
      {!loggedIn && (
        <p className="register-link">Don’t have an account? <Link to="/register">Register</Link></p>
      )}
    </div>
  );
}
