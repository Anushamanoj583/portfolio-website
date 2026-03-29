function sendMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  fetch("/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, message })
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
  })
  .catch(err => console.error(err));
}
app.post("/send", (req, res) => {
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