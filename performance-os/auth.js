const API_BASE = "https://api.krishnaanalytics.tech";

// -----------------------------
// Request OTP
// -----------------------------
async function requestOTP() {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("Please enter your email");
    return;
  }

  const res = await fetch(`${API_BASE}/auth/request-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ email })
  });

  if (!res.ok) {
    alert("Failed to send code. Try again.");
    return;
  }

  // store email temporarily for verification step
  sessionStorage.setItem("login_email", email);

  window.location.href = "verify.html";
}

// -----------------------------
// Verify OTP
// -----------------------------
async function verifyOTP() {
  const code = document.getElementById("otp").value.trim();
  const email = sessionStorage.getItem("login_email");

  if (!email || code.length !== 6) {
    alert("Invalid code");
    return;
  }

  const res = await fetch(`${API_BASE}/auth/verify-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ email, code })
  });

  if (!res.ok) {
    alert("Invalid or expired code");
    return;
  }

  sessionStorage.removeItem("login_email");
  window.location.href = "index.html";
}
