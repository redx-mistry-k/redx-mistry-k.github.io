// ===== CONFIG =====
const TEST_MODE = true;

// ===== AUTH =====
function login(email) {
  sessionStorage.setItem("klpUser", email);
  window.location.href = "index.html";
}

function logout() {
  sessionStorage.removeItem("klpUser");
  window.location.href = "login.html";
}

function getCurrentUser() {
  return sessionStorage.getItem("klpUser");
}

function requireAuth() {
  if (!getCurrentUser()) {
    window.location.href = "login.html";
  }
}

// ===== MOCK DATA =====
const knowledgeItems = [
  {
    id: 1,
    title: "Server restart order",
    system: "Windows",
    process: "IT",
    status: "Approved",
    owner: "user@example.com",
  },
  {
    id: 2,
    title: "Payroll cutoff rule",
    system: "SAP",
    process: "Finance",
    status: "Draft",
    owner: "user@example.com",
  },
];

// ===== HELPERS =====
function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function statusClass(status) {
  return "status-" + status.toLowerCase();
}
