const API_BASE = "https://api.krishnaanalytics.tech";

// -----------------------------
// Request OTP
// -----------------------------
async function requestOTP() {
  const emailInput = document.getElementById("email");
  const button = event.target;
  const email = emailInput.value.trim();

  if (!email) {
    showStatus("Please enter your email", "error");
    return;
  }

  if (!isValidEmail(email)) {
    showStatus("Please enter a valid email", "error");
    return;
  }

  // Disable button during request
  button.disabled = true;
  button.textContent = "Sending...";

  try {
    const res = await fetch(`${API_BASE}/auth/request-otp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include",
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!res.ok || !data.ok) {
      showStatus("Failed to send code. Try again.", "error");
      button.disabled = false;
      button.textContent = "Send verification code";
      return;
    }

    // store email temporarily for verification step
    sessionStorage.setItem("login_email", email);
    window.location.href = "verify.html";

  } catch (error) {
    console.error("Error:", error);
    showStatus("Network error. Please try again.", "error");
    button.disabled = false;
    button.textContent = "Send verification code";
  }
}

// -----------------------------
// Verify OTP
// -----------------------------
async function verifyOTP() {
  const codeInput = document.getElementById("otp");
  const button = event.target;
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

  // Disable button during request
  button.disabled = true;
  button.textContent = "Verifying...";

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
      button.textContent = "Verify & Continue";
      return;
    }

    sessionStorage.removeItem("login_email");
    showStatus("Success! Redirecting...", "success");
    setTimeout(() => window.location.href = "index.html", 500);

  } catch (error) {
    console.error("Error:", error);
    showStatus("Network error. Please try again.", "error");
    button.disabled = false;
    button.textContent = "Verify & Continue";
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
    const colors = {
      error: "#ef4444",
      success: "#22c55e",
      info: "#9ca3af"
    };
    statusEl.style.color = colors[type] || colors.info;
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
