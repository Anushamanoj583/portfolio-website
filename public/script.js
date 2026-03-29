function sendMessage() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Validation
  if (!name || !email || !message) {
    alert("Please fill all fields");
    return;
  }

  fetch("https://portfolio-website.onrender.com/send", { 
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
  .then(function(res) {
    return res.text();
  })
  .then(function(data) {
    alert(data);

    // Clear form
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  })
  .catch(function(err) {
    console.error(err);
    alert("Error sending message");
  });
}