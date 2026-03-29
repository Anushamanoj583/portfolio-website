function sendMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  fetch("https://portfolio-backend-u7wr.onrender.com/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      subject: "Portfolio Contact",
      message: message
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert("Message sent successfully!");
    } else {
      alert("Message failed to send");
    }

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  })
  .catch(err => {
    console.error(err);
    alert("Error sending message");
  });
}