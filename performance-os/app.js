const API_BASE = "https://api.krishnaanalytics.tech"

// -----------------------------
// Auth guard (REAL)
// -----------------------------
async function checkAuth() {
  try {
    const res = await fetch(`${API_BASE}/auth/me`, {
      credentials: "include"
    })

    const data = await res.json()

    if (!data.loggedIn) {
      window.location.href = "login.html"
    }
  } catch {
    window.location.href = "login.html"
  }
}

// -----------------------------
// Mock state (UI only for now)
// -----------------------------
const state = {
  level: 1,
  xp: 0,
  nextLevelXP: 200,

  focus: [
    { id: 1, title: "Primary objective", xp: 40, done: false },
    { id: 2, title: "Secondary objective", xp: 25, done: false }
  ],

  systems: [
    { id: 1, title: "Daily movement", streak: 0 },
    { id: 2, title: "Deep focus block", streak: 0 }
  ],

  rewards: [
    { id: 1, title: "Guilt-free leisure", cost: 100 }
  ],

  performance: {
    labels: ["Focus", "Consistency", "Energy", "Output", "Recovery"],
    values: [60, 0, 50, 55, 65]
  }
}

// -----------------------------
// DOM refs
// -----------------------------
const focusEl = document.getElementById("focusList")
const systemsEl = document.getElementById("systemsList")
const rewardsEl = document.getElementById("rewardsList")

// -----------------------------
// Render functions
// -----------------------------
function renderHeader() {
  document.getElementById("level").textContent = state.level
  document.getElementById("xp").textContent = state.xp

  const percent = Math.min(
    (state.xp / state.nextLevelXP) * 100,
    100
  )

  document.querySelector(".xp-fill").style.width = percent + "%"
}

function renderFocus() {
  focusEl.innerHTML = ""

  state.focus.forEach(item => {
    const li = document.createElement("li")
    li.innerHTML = `
      <span>${item.done ? "✅" : "⬜"} ${item.title}</span>
      <span class="badge">+${item.xp} XP</span>
    `
    li.onclick = () => toggleFocus(item.id)
    li.style.opacity = item.done ? 0.6 : 1
    focusEl.appendChild(li)
  })
}

function renderSystems() {
  systemsEl.innerHTML = ""

  state.systems.forEach(sys => {
    const li = document.createElement("li")
    li.innerHTML = `
      <span>${sys.title}</span>
      <span>${sys.streak} 🔁</span>
    `
    systemsEl.appendChild(li)
  })
}

function renderRewards() {
  rewardsEl.innerHTML = ""

  state.rewards.forEach(r => {
    const li = document.createElement("li")
    li.innerHTML = `
      <span>${r.title}</span>
      <span>${r.cost} XP</span>
    `
    rewardsEl.appendChild(li)
  })
}

// -----------------------------
// Interactions
// -----------------------------
function toggleFocus(id) {
  const item = state.focus.find(f => f.id === id)
  if (!item || item.done) return

  item.done = true
  state.xp += item.xp

  if (state.xp >= state.nextLevelXP) {
    state.level++
    state.xp -= state.nextLevelXP
    state.nextLevelXP += 100
  }

  renderHeader()
  renderFocus()
}

// -----------------------------
// Chart
// -----------------------------
function renderChart() {
  new Chart(document.getElementById("performanceChart"), {
    type: "radar",
    data: {
      labels: state.performance.labels,
      datasets: [
        {
          data: state.performance.values,
          fill: true
        }
      ]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        r: {
          ticks: { display: false }
        }
      }
    }
  })
}

// -----------------------------
// Init
// -----------------------------
async function init() {
  await checkAuth()
  renderHeader()
  renderFocus()
  renderSystems()
  renderRewards()
  renderChart()
}

init()
