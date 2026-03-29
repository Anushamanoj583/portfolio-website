// server.js

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");

const app = express();

// ===== Middleware =====
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== Serve frontend static files =====
app.use(express.static(path.join(__dirname, "public")));

// ===== Database connection =====
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // needed for cloud DBs like Render
});

// ===== Routes =====

// Test route (optional)
app.get("/test", (req, res) => res.send("Server is running!"));

// Contact form POST
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Form submission received:", { name, email, message });

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  try {
    // Insert into your 'messages' table
    const result = await pool.query(
      "INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *",
      [name, email, message]
    );
    console.log("Inserted row:", result.rows[0]);
    res.json({ success: true });
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ===== Catch-all route for frontend =====
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ===== Start server =====
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));