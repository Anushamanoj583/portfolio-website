const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
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

// ✅ POST ROUTE (THIS FIXES YOUR ERROR)
app.post("/send", (req, res) => {
  console.log("POST HIT"); // debug

  const { name, email, message } = req.body;

  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";

  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      console.error(err);
      res.send("Error");
    } else {
      res.send("Message Saved");
    }
  });
});

// ✅ GET ROUTE TO SEE MESSAGES
app.get("/messages", (req, res) => {
  db.query("SELECT * FROM messages", (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.json(result);
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});