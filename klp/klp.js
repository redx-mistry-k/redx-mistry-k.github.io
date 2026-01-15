// =======================================
// KLP Frontend API Client (Production)
// =======================================

// Base API path (same domain, Worker route)
const API_BASE = "/api";

// ---------------------------------------
// Low-level API helper
// ---------------------------------------
async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include", // important for Cloudflare Access cookies
    ...options
  });

  // Not authenticated → trigger Cloudflare Access
  if (res.status === 401 || res.status === 403) {
    window.location.href = "/cdn-cgi/access/login";
    return;
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`API error: ${text}`);
  }

  // No content
  if (res.status === 204) return null;

  return res.json();
}

// ---------------------------------------
// Auth (Cloudflare Access)
// ---------------------------------------
async function requireAuth() {
  try {
    await api("/me");
  } catch (e) {
    console.error("Auth check failed", e);
  }
}

function logout() {
  // Cloudflare Access logout endpoint
  window.location.href = "/cdn-cgi/access/logout";
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
