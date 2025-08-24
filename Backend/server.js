import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import adminEventsRouter from "./routes/adminEvents.js";
import eventRegistrationsRouter from "./routes/eventRegistrations.js"; // NEW

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join("uploads")));

app.get("/", (req, res) => res.send("Backend is running..."));


app.use("/api/events", adminEventsRouter);
app.use("/api/events", eventRegistrationsRouter); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
