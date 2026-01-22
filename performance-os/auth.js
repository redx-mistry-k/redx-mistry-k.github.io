const API_BASE = "https://api.krishnaanalytics.tech";

// -----------------------------
// Request OTP
// -----------------------------
async function requestOTP() {
  const emailInput = document.getElementById("email");
  const button = document.getElementById("submitBtn");
  const statusEl = document.getElementById("status");
  const email = emailInput.value.trim();

  console.log("requestOTP called with email:", email);

  if (!email) {
    showStatus("Please enter your email", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showStatus("Please enter a valid email", "error");
    return;
  }

  // Show loading state
  button.disabled = true;
  button.classList.add("loading");
  if (statusEl) statusEl.classList.remove("show");

  try {
    console.log("Sending OTP request to:", `${API_BASE}/auth/request-otp`);
    
    const res = await fetch(`${API_BASE}/auth/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ email })
    });

    console.log("Response status:", res.status);
    const data = await res.json();
    console.log("Response data:", data);

    if (!res.ok || !data.ok) {
      showStatus("Failed to send code. Try again.", "error");
      button.disabled = false;
      button.classList.remove("loading");
      return;
    }

    // store email temporarily for verification step
    sessionStorage.setItem("login_email", email);
    console.log("Stored email in sessionStorage, redirecting to verify.html");
    
    // Redirect to verify page
    window.location.href = "verify.html";

  } catch (error) {
    console.error("Error in requestOTP:", error);
    showStatus("Network error. Please try again.", "error");
    button.disabled = false;
    button.classList.remove("loading");
  }
}

// -----------------------------
// Verify OTP
// -----------------------------
async function verifyOTP() {
  const codeInput = document.getElementById("otp");
  const button = document.getElementById("submitBtn");
  const statusEl = document.getElementById("status");
  const code = codeInput.value.trim();
  const email = sessionStorage.getItem("login_email");

  if (!email) {
    showStatus("Session expired. Please start again.", "error");
    setTimeout(() => window.location.href = "login.html", 2000);
    return;
  }

  if (code.length !== 6 || !/^\d+$/.test(code)) {
    showStatus("Please enter a valid 6-digit code", "error");
    return;
  }

  // Show loading state
  button.disabled = true;
  button.classList.add("loading");
  if (statusEl) statusEl.classList.remove("show");

  try {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ email, code })
    });

    const data = await res.json();

    if (!res.ok || data.error) {
      showStatus(data.error || "Invalid or expired code", "error");
      button.disabled = false;
      button.classList.remove("loading");
      return;
    }

    sessionStorage.removeItem("login_email");
    showStatus("Success! Redirecting...", "success");
    setTimeout(() => window.location.href = "index.html", 500);

  } catch (error) {
    console.error("Error:", error);
    showStatus("Network error. Please try again.", "error");
    button.disabled = false;
    button.classList.remove("loading");
  }
}

// -----------------------------
// Helper Functions
// -----------------------------
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showStatus(message, type = "info") {
  const statusEl = document.getElementById("status");
  if (statusEl) {
    statusEl.textContent = message;
    statusEl.className = `status-message ${type} show`;
  }
}

// Allow Enter key to submit
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const otpInput = document.getElementById("otp");

  if (emailInput) {
    emailInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") requestOTP();
    });
  }

  if (otpInput) {
    otpInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") verifyOTP();
    });
    // Auto-format OTP input (digits only)
    otpInput.addEventListener("input", (e) => {
      e.target.value = e.target.value.replace(/\D/g, "").slice(0, 6);
    });
  }
});
