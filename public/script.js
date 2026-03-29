function sendMessage() {

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  console.log("🚀 Sending request...");

  fetch("https://portfolio-backend-u7wr.onrender.com/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message
    })
  })
    .then(res => res.text())
    .then(data => {
      console.log("✅ Response:", data);
      alert("Message sent!");

      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    })
    .catch(err => {
      console.error("❌ Error:", err);
      alert("Error sending message");
    });
}