const API_BASE = "https://api.krishnaanalytics.tech";

async function requestOTP() {
  const email = document.getElementById("email").value.trim();
  const button = document.getElementById("submitBtn");

  if (!email) {
    alert("Please enter your email");
    return;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    alert("Please enter a valid email");
    return;
  }

  button.disabled = true;
  button.textContent = "Sending...";

  try {
    const res = await fetch(`${API_BASE}/auth/request-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email })
    });

    const data = await res.json();
    console.log("Status:", res.status, "Data:", data);

    if (data.ok) {
      // Email sent successfully
      sessionStorage.setItem("login_email", email);
      alert("Code sent! Check your email.");
      
      // Force redirect
      window.location.replace("verify.html");
    } else {
      alert("Failed to send code: " + (data.error || "Unknown error"));
      button.disabled = false;
      button.textContent = "Send verification code";
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Network error: " + error.message);
    button.disabled = false;
    button.textContent = "Send verification code";
  }
}

async function verifyOTP() {
  const code = document.getElementById("otp").value.trim();
  const email = sessionStorage.getItem("login_email");
  const button = document.getElementById("submitBtn");

  if (!email) {
    alert("Session expired. Please login again.");
    window.location.href = "login.html";
    return;
  }

  if (code.length !== 6) {
    alert("Please enter a 6-digit code");
    return;
  }

  button.disabled = true;
  button.textContent = "Verifying...";

  try {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, code })
    });

    const data = await res.json();
    console.log("Status:", res.status, "Data:", data);

    if (data.ok) {
      sessionStorage.removeItem("login_email");
      alert("Success! Logging you in...");
      window.location.replace("index.html");
    } else {
      alert("Invalid code: " + (data.error || "Please try again"));
      button.disabled = false;
      button.textContent = "Verify & Continue";
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Network error: " + error.message);
    button.disabled = false;
    button.textContent = "Verify & Continue";
  }
}
