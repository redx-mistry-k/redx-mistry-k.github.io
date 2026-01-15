// =======================================
// KLP Frontend API Client (Email + PIN Auth)
// =======================================

const API_BASE = "/api";

// ---------------------------------------
// Session helpers
// ---------------------------------------
function getAuthHeaders() {
  const email = sessionStorage.getItem("klp_email");
  const pin = sessionStorage.getItem("klp_pin");

  if (!email || !pin) return null;

  return {
    "x-user-email": email,
    "x-user-pin": pin
  };
}

function redirectToLogin() {
  window.location.href = "login.html";
}

// ---------------------------------------
// Low-level API helper
// ---------------------------------------
async function api(path, options = {}) {
  const authHeaders = getAuthHeaders();

  if (!authHeaders) {
    redirectToLogin();
    return;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...authHeaders
    }
  });

  if (res.status === 401 || res.status === 403) {
    sessionStorage.clear();
    redirectToLogin();
    return;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${text}`);
  }

  if (res.status === 204) return null;

  return res.json();
}

// ---------------------------------------
// Auth
// ---------------------------------------
async function login(email, pin) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, pin })
  });

  if (!res.ok) {
    throw new Error("Invalid email or PIN");
  }

  sessionStorage.setItem("klp_email", email);
  sessionStorage.setItem("klp_pin", pin);
}

function requireAuth() {
  const authHeaders = getAuthHeaders();
  if (!authHeaders) {
    redirectToLogin();
  }
}

function logout() {
  sessionStorage.clear();
  redirectToLogin();
}

// ---------------------------------------
// Data APIs
// ---------------------------------------
async function getKnowledge() {
  return api("/knowledge");
}

async function approveKnowledge(id) {
  return api("/knowledge/approve", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  });
}

// ---------------------------------------
// Helpers
// ---------------------------------------
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

