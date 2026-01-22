const API = "https://api.krishnaanalytics.tech"

let state = {
  level: 1,
  xp: 0,
  focus: []
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

  if (!res.ok) {
    window.location.href = "login.html"
    return
  }

  const data = await res.json()

  state.level = data.stats?.level || 1
  state.xp = data.stats?.xp || 0
  state.focus = data.focus || []

  renderHeader()
  renderFocus()
}

function renderHeader() {
  document.getElementById("level").textContent = state.level
  document.getElementById("xp").textContent = state.xp

  const percent = Math.min((state.xp / 200) * 100, 100)
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
    `
    li.style.opacity = item.done ? 0.6 : 1
    li.onclick = () => toggleFocus(item.id)
    el.appendChild(li)
  })
}

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
  document.getElementById("newFocusXP").value = "25"

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

init()
