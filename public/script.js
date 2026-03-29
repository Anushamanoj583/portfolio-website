document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const sendBtn = document.getElementById("sendBtn");
  const formResponse = document.getElementById("formResponse");

  sendBtn.addEventListener("click", async () => {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      formResponse.style.color = "red";
      formResponse.textContent = "Please fill in all fields!";
      return;
    }

    try {
      const res = await fetch("/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (data.success) {
        formResponse.style.color = "green";
        formResponse.textContent = "Message sent successfully!";
        nameInput.value = "";
        emailInput.value = "";
        messageInput.value = "";
      } else {
        formResponse.style.color = "red";
        formResponse.textContent = "Error: " + (data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      formResponse.style.color = "red";
      formResponse.textContent = "Server error, check console.";
    }
  });
});