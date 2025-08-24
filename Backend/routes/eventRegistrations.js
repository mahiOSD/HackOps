import express from "express";
import db from "../database.js";

const router = express.Router();

// Register student
router.post("/:id/register", (req, res) => {
  const { id } = req.params;
  const eventId = parseInt(id, 10); // ensure integer
  const { student_name, email, contact_number, semester, department } = req.body;

  if (!student_name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  const sql = `
    INSERT INTO event_registrations 
      (event_id, student_name, email, contact_number, semester, department)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [eventId, student_name, email, contact_number, semester, department], (err, result) => {
    if (err) {
      console.error("SQL Error:", err.sqlMessage);
      return res.status(500).json({ error: "Failed to register" });
    }
    res.json({ message: "Registration successful", registrationId: result.insertId });
  });
});

export default router;
