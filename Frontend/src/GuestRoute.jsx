
import React from "react";
import { Navigate } from "react-router-dom";

export default function GuestRoute({ children }) {
  const token = localStorage.getItem("token");

  if (token) {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user.role === "student") return <Navigate to="/student" replace />;
    else return <Navigate to="/admin" replace />;
  }

 
  return children;
}
