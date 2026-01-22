const API = "https://api.krishnaanalytics.tech"

let state = {
  level: 1,
  xp: 0,
  nextLevelXP: 200,
  focus: [],
  systems: []
}

async function checkAuth() {
  const res = await fetch(`${API}/auth/me`, { credentials: "include" })
  const data = await res.json()
  if (!data.loggedIn) window.location.href = "login.html"
}

async function init() {
  await checkAuth()

  const res = await fetch(`${API}/dashboard/init`, {
    credentials: "include"
  })

  const data = await res.json()

  state.level = data.stats.level
  state.xp = data.stats.xp
  state.nextLevelXP = data.nextLevelXP
  state.focus = data.focus
  state.systems = data.systems

  renderHeader()
  renderFocus()
  renderSystems()
}

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
  const el = document.getElementById("focusList")
  el.innerHTML = ""

  state.focus.forEach(item => {
    const li = document.createElement("li")

    li.innerHTML = `
      <span>${item.done ? "✅" : "⬜"} ${item.title}</span>
      <span class="badge">+${item.xp} XP</span>
      <div class="actions">
        ${item.done ? `<button onclick="undoFocus(${item.id})">Undo</button>` : ""}
        <button onclick="deleteFocus(${item.id})">✕</button>
      </div>
    `

    li.style.opacity = item.done ? 0.6 : 1
    if (!item.done) li.onclick = () => toggleFocus(item.id)

    el.appendChild(li)
  })
}

function renderSystems() {
  const el = document.getElementById("systemsList")
  el.innerHTML = ""

  state.systems.forEach(sys => {
    const li = document.createElement("li")
    li.innerHTML = `
      <span>${sys.title}</span>
      <span>${sys.streak} 🔁</span>
      <button onclick="deleteSystem(${sys.id})">✕</button>
    `
    li.onclick = () => completeSystem(sys.id)
    el.appendChild(li)
  })
}

/* ---------- actions ---------- */

async function addFocus() {
  const title = document.getElementById("newFocusTitle").value.trim()
  const xp = parseInt(document.getElementById("newFocusXP").value, 10)
  if (!title || isNaN(xp)) return

  await fetch(`${API}/focus/add`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, xp })
  })

  document.getElementById("newFocusTitle").value = ""
  init()
}

async function toggleFocus(id) {
  await fetch(`${API}/focus/toggle`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  })
  init()
}

async function undoFocus(id) {
  await fetch(`${API}/focus/undo`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  })
  init()
}

async function deleteFocus(id) {
  await fetch(`${API}/focus/delete`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  })
  init()
}

async function addSystem() {
  const title = document.getElementById("newSystemTitle").value.trim()
  if (!title) return

  await fetch(`${API}/systems/add`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title })
  })
  init()
}

async function completeSystem(id) {
  await fetch(`${API}/systems/complete`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  })
  init()
}

async function deleteSystem(id) {
  await fetch(`${API}/systems/delete`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id })
  })
  init()
}

init()
