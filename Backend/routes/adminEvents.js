import express from "express";
import db from "../database.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// ---------------------- CREATE Event ----------------------
router.post("/add", upload.single("image"), (req, res) => {
    const { title, description, date, time, location, category } = req.body;

    if (!title || !description || !date || !time || !location) {
        return res.status(400).json({ error: "All required fields must be filled" });
    }

    const image = req.file ? req.file.filename : null;

    const sql = "INSERT INTO events (title, description, date, time, location, category, image) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [title, description, date, time, location, category, image], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.status(201).json({ message: "Event created", event_id: result.insertId });
    });
});

// ---------------------- READ All Events ----------------------
router.get("/", (req, res) => {
    db.query("SELECT * FROM events ORDER BY created_at DESC", (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        res.json(results);
    });
});

// ---------------------- READ Single Event ----------------------
router.get("/:id", (req, res) => {
    db.query("SELECT * FROM events WHERE id=?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ error: "Event not found" });
        res.json(results[0]);
    });
});

// ---------------------- UPDATE Event ----------------------
router.put("/update/:id", upload.single("image"), (req, res) => {
    const { title, description, date, time, location, category } = req.body;

    db.query("SELECT image FROM events WHERE id=?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ error: "Event not found" });

        const oldImage = results[0].image;
        const newImage = req.file ? req.file.filename : oldImage;

        if (req.file && oldImage) fs.unlinkSync(path.join("uploads", oldImage));

        const sql = "UPDATE events SET title=?, description=?, date=?, time=?, location=?, category=?, image=? WHERE id=?";
        db.query(sql, [title, description, date, time, location, category, newImage, req.params.id], (err) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json({ message: "Event updated successfully" });
        });
    });
});

// ---------------------- DELETE Event ----------------------
router.delete("/delete/:id", (req, res) => {
    db.query("SELECT image FROM events WHERE id=?", [req.params.id], (err, results) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (results.length === 0) return res.status(404).json({ error: "Event not found" });

        const image = results[0].image;
        if (image) fs.unlinkSync(path.join("uploads", image));

        db.query("DELETE FROM events WHERE id=?", [req.params.id], (err) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json({ message: "Event deleted successfully" });
        });
    });
});

export default router;
