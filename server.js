require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// Pick database URL depending on environment
const databaseURL =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL_EXTERNAL
    : process.env.DATABASE_URL_LOCAL;

const pool = new Pool({
  connectionString: databaseURL,
});

// Test route
app.get("/", (req, res) => res.send("Server is running!"));

// Contact route
app.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: "Missing fields" });
  }

  try {
    await pool.query(
      "INSERT INTO contact (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
    res.json({ success: true });
  } catch (err) {
    console.error("Database error:", err.message);
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
