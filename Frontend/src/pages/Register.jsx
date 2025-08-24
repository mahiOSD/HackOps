import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [role, setRole] = useState('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registered, setRegistered] = useState(false);
  const navigate = useNavigate();



  const handleRegister = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });
    const data = await res.json();
    if (res.ok) {
      setRegistered(true);
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
      <h2>Register</h2>
      {!registered ? (
        <form onSubmit={handleRegister} className="auth-form">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label>Role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>

          <button type="submit" className="btn">Register</button>
        </form>
      ) : (
        <button className="btn" onClick={goToDashboard}>
          {role === 'student' ? 'Go to Student Dashboard' : 'Go to Admin Dashboard'}
        </button>
      )}
    </div>
  );
}
