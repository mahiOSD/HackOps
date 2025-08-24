// DELETE Event
router.delete("/delete/:id", (req, res) => {
  const eventId = req.params.id;

  db.query("SELECT image FROM events WHERE id=?", [eventId], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(404).json({ error: "Event not found" });

    const image = results[0].image;
    if (image) {
      const fs = require("fs");
      const path = require("path");
      fs.unlink(path.join("uploads", image), (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    db.query("DELETE FROM events WHERE id=?", [eventId], (err) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json({ message: "Event deleted successfully" });
    });
  });
});
