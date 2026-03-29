const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Serve frontend files from public folder
app.use(express.static(path.join(__dirname, "public")));

// Contact form API
app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO messages (name, email, subject, message) VALUES ($1, $2, $3, $4)",
      [name, email, subject, message]
    );
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});