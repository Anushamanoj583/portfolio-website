// firebase.js

// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔴 REPLACE with your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyBpdfnvIoPhVyoACtcGPcEAoc1D65r4nkk",
    authDomain: "portfolio-65df2.firebaseapp.com",
    projectId: "portfolio-65df2",
    storageBucket: "portfolio-65df2.firebasestorage.app",
    messagingSenderId: "547782862437",
    appId: "1:547782862437:web:d1dd9596904b9992dc488c",
    measurementId: "G-B6QEVZL7JH"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Handle Form Submission
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill in all fields!");
    return;
  }

  try {
    await addDoc(collection(db, "messages"), {
      name: name,
      email: email,
      message: message,
      timestamp: serverTimestamp()
    });

    alert("Message sent successfully ✅");
    form.reset();

  } catch (error) {
    console.error("Error adding document: ", error);
    alert("Error sending message ❌");
  }
});