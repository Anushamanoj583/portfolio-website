const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// ⚠️ MySQL (WILL FAIL ON RENDER unless you use online DB)
const db = mysql.createConnection({
  host: "localhost", // ❌ change later if using online DB
  user: "root",
  password: "",
  database: "portfolio_db"
});

db.connect(err => {
  if (err) {
    console.error("DB Error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

// POST route
app.post("/send", (req, res) => {
  console.log("POST HIT");

  const { name, email, message } = req.body;

  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving message");
    } else {
      res.send("Message Saved");
    }
  });
});

// GET route
app.get("/messages", (req, res) => {
  db.query("SELECT * FROM messages", (err, result) => {
    if (err) {
      res.status(500).send("Error fetching messages");
    } else {
      res.json(result);
    }
  });
});

// ✅ IMPORTANT: Render PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});