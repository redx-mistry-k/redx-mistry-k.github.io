function requestOTP() {
  const email = document.getElementById("email").value.trim();

  if (!email) {
    alert("Please enter your email");
    return;
  }

  // Save email temporarily (later session-based)
  localStorage.setItem("auth_email", email);

  // In real version: call Worker API here
  console.log("Requesting OTP for:", email);

  window.location.href = "verify.html";
}

function verifyOTP() {
  const otp = document.getElementById("otp").value.trim();
  const status = document.getElementById("status");

  if (otp.length !== 6) {
    status.textContent = "Please enter a valid 6-digit code";
    return;
  }

  // In real version: verify via Worker API
  console.log("Verifying OTP:", otp);

  // Mock success
  status.textContent = "Verified. Redirecting…";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
}

