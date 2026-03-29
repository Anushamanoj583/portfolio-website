const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Contact form API
app.post("/contact", async (req, res) => {
  console.log("Request recieved:",req.body);
  const { name, email, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO contact (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    res.send("Message sent successfully");
  } catch (err) {
    console.log(err);
    res.send("Error saving message");
  }
});

// Render port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
