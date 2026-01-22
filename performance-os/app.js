const API = "https://api.krishnaanalytics.tech"

let state = {
  level: 1,
  xp: 0,
  nextLevelXP: 200,
  focus: [],
  systems: []
}

/* ---------------------------
   Auth
--------------------------- */

async function checkAuth() {
  try {
    const res = await fetch(`${API}/auth/me`, { credentials: "include" })
    const data = await res.json()
    if (!data.loggedIn) {
      window.location.href = "login.html"
    }
  } catch (error) {
    console.error("Auth check failed:", error)
    window.location.href = "login.html"
  }
}

/* ---------------------------
   Init
--------------------------- */

async function init() {
  await checkAuth()

  try {
    if (window.showLoading) window.showLoading()

    const res = await fetch(`${API}/dashboard/init`, {
      credentials: "include"
    })

    if (!res.ok) {
      throw new Error("Failed to load dashboard")
    }

    const data = await res.json()

    state.level = data.stats.level
    state.xp = data.stats.xp
    state.nextLevelXP = data.nextLevelXP
    state.focus = data.focus
    state.systems = data.systems.results || data.systems

    renderHeader()
    renderFocus()
    renderSystems()
    setupNav()

    if (window.hideLoading) window.hideLoading()
  } catch (error) {
    console.error("Init failed:", error)
    if (window.hideLoading) window.hideLoading()
    showNotification("Failed to load data", "error")
  }
}

/* ---------------------------
   Header + XP animation
--------------------------- */

function renderHeader(xpGained = 0) {
  document.getElementById("level").textContent = state.level
  document.getElementById("xp").textContent = state.xp

  // Update sidebar level if exists
  const sidebarLevel = document.getElementById("sidebarLevel")
  if (sidebarLevel) {
    sidebarLevel.textContent = state.level
  }

  // Update XP progress info if exists
  const xpProgress = document.getElementById("xpProgress")
  const xpTarget = document.getElementById("xpTarget")
  if (xpProgress) xpProgress.textContent = state.xp
  if (xpTarget) xpTarget.textContent = state.nextLevelXP

  const percent = Math.min(
    (state.xp / state.nextLevelXP) * 100,
    100
  )

  // Update XP percent if exists
  const xpPercentEl = document.querySelector(".xp-percent")
  if (xpPercentEl) {
    xpPercentEl.textContent = Math.round(percent) + "%"
  }

  const fill = document.querySelector(".xp-fill")
  fill.style.width = percent + "%"

  // XP gain animation
  if (xpGained > 0) {
    fill.classList.remove("pulse")
    void fill.offsetWidth
    fill.classList.add("pulse")

    const float = document.createElement("div")
    float.className = "xp-float"
    float.textContent = `+${xpGained} XP`
    document.body.appendChild(float)

    setTimeout(() => float.remove(), 1500)
  }
}

/* ---------------------------
   View switching
--------------------------- */

function setupNav() {
  document.querySelectorAll(".nav-btn").forEach(btn => {
    btn.onclick = () => switchView(btn.dataset.view)
  })
}

function switchView(view) {
  document.querySelectorAll(".nav-btn").forEach(b =>
    b.classList.toggle("active", b.dataset.view === view)
  )

  document.querySelectorAll(".view").forEach(v =>
    v.classList.toggle("active", v.id === `view-${view}`)
  )
}

/* ---------------------------
   Focus
--------------------------- */

function renderFocus() {
  const overview = document.getElementById("focusList")
  const full = document.getElementById("focusListFull")
  const emptyOverview = document.getElementById("focusEmpty")
  const emptyFull = document.getElementById("focusEmptyFull")
  const countOverview = document.getElementById("focusCount")
  const countFull = document.getElementById("focusCountFull")

  overview.innerHTML = ""
  full.innerHTML = ""

  // Update counts
  const totalCount = state.focus.length
  const incompleteCount = state.focus.filter(item => !item.done).length
  
  if (countOverview) {
    countOverview.textContent = `${incompleteCount} task${incompleteCount !== 1 ? 's' : ''}`
  }
  if (countFull) {
    countFull.textContent = `${totalCount} task${totalCount !== 1 ? 's' : ''}`
  }

  if (state.focus.length === 0) {
    if (emptyOverview) emptyOverview.style.display = "block"
    if (emptyFull) emptyFull.style.display = "block"
    return
  }

  if (emptyOverview) emptyOverview.style.display = "none"
  if (emptyFull) emptyFull.style.display = "none"

  state.focus.forEach(item => {
    // Create two separate items instead of cloning
    const overviewItem = createFocusItem(item)
    const fullItem = createFocusItem(item)
    
    overview.appendChild(overviewItem)
    full.appendChild(fullItem)
  })
}

function createFocusItem(item) {
  const li = document.createElement("li")
  const checkbox = item.done ? "✅" : "⬜"
  
  li.innerHTML = `
    <span>${checkbox} ${escapeHtml(item.title)}</span>
    <div>
      <span class="badge">+${item.xp} XP</span>
      ${item.done ? '<button class="undo-btn" onclick="undoFocus('+item.id+', event)">↶ Undo</button>' : ''}
      <button class="delete-btn" onclick="deleteFocus(${item.id}, event)">🗑️</button>
    </div>
  `
  li.style.opacity = item.done ? 0.6 : 1
  
  if (!item.done) {
    li.onclick = (e) => {
      if (!e.target.classList.contains('delete-btn')) {
        toggleFocus(item.id, item.xp)
      }
    }
  }
  
  return li
}

async function addFocus() {
  const titleInput = document.getElementById("newFocusTitle")
  const xpInput = document.getElementById("newFocusXP")
  const title = titleInput.value.trim()
  const xp = parseInt(xpInput.value, 10)
  
  if (!title || isNaN(xp) || xp < 1) {
    showNotification("Please enter a valid title and XP value", "error")
    return
  }

  try {
    const res = await fetch(`${API}/focus/add`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, xp })
    })

    const data = await res.json()
    
    if (!data.ok) {
      throw new Error("Failed to add focus item")
    }

    titleInput.value = ""
    xpInput.value = "25"
    showNotification("Focus item added!", "success")
    await init()
  } catch (error) {
    console.error("Add focus failed:", error)
    showNotification("Failed to add focus item", "error")
  }
}

async function addFocusFromFocus() {
  const titleInput = document.getElementById("newFocusTitleFocus")
  const xpInput = document.getElementById("newFocusXPFocus")
  const title = titleInput.value.trim()
  const xp = parseInt(xpInput.value, 10)
  
  if (!title || isNaN(xp) || xp < 1) {
    showNotification("Please enter a valid title and XP value", "error")
    return
  }

  try {
    const res = await fetch(`${API}/focus/add`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, xp })
    })

    const data = await res.json()
    
    if (!data.ok) {
      throw new Error("Failed to add focus item")
    }

    titleInput.value = ""
    xpInput.value = "25"
    showNotification("Focus item added!", "success")
    await init()
  } catch (error) {
    console.error("Add focus failed:", error)
    showNotification("Failed to add focus item", "error")
  }
}

async function toggleFocus(id, xp) {
  try {
    const res = await fetch(`${API}/focus/toggle`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })

    const data = await res.json()
    
    if (!data.ok) {
      throw new Error("Failed to toggle focus item")
    }

    // optimistic XP animation
    state.xp += xp
    renderHeader(xp)
    showNotification(`+${xp} XP earned!`, "success")

    setTimeout(() => init(), 300)
  } catch (error) {
    console.error("Toggle focus failed:", error)
    showNotification("Failed to complete focus item", "error")
  }
}

async function undoFocus(id, event) {
  event.stopPropagation()
  
  if (!confirm("Undo this completion? You'll lose the XP gained.")) {
    return
  }

  try {
    const res = await fetch(`${API}/focus/undo`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })

    const data = await res.json()
    
    if (data.error) {
      showNotification(data.error, "error")
      return
    }
    
    if (!data.ok) {
      throw new Error("Failed to undo focus item")
    }

    showNotification("Focus item undone", "success")
    await init()
  } catch (error) {
    console.error("Undo focus failed:", error)
    showNotification("Failed to undo focus item", "error")
  }
}

async function deleteFocus(id, event) {
  event.stopPropagation()
  
  if (!confirm("Delete this focus item permanently?")) {
    return
  }

  try {
    const res = await fetch(`${API}/focus/delete`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })

    const data = await res.json()
    
    if (!data.ok) {
      throw new Error("Failed to delete focus item")
    }

    showNotification("Focus item deleted", "success")
    await init()
  } catch (error) {
    console.error("Delete focus failed:", error)
    showNotification("Failed to delete focus item", "error")
  }
}

/* ---------------------------
   Systems
--------------------------- */

function renderSystems() {
  const overview = document.getElementById("systemsList")
  const full = document.getElementById("systemsListFull")
  const emptyOverview = document.getElementById("systemsEmpty")
  const emptyFull = document.getElementById("systemsEmptyFull")
  const countOverview = document.getElementById("systemsCount")
  const countFull = document.getElementById("systemsCountFull")

  overview.innerHTML = ""
  full.innerHTML = ""

  // Update counts
  const totalCount = state.systems.length
  
  if (countOverview) {
    countOverview.textContent = `${totalCount} habit${totalCount !== 1 ? 's' : ''}`
  }
  if (countFull) {
    countFull.textContent = `${totalCount} habit${totalCount !== 1 ? 's' : ''}`
  }

  if (state.systems.length === 0) {
    if (emptyOverview) emptyOverview.style.display = "block"
    if (emptyFull) emptyFull.style.display = "block"
    return
  }

  if (emptyOverview) emptyOverview.style.display = "none"
  if (emptyFull) emptyFull.style.display = "none"

  state.systems.forEach(sys => {
    // Create function to make system item
    const createSystemItem = () => {
      const li = document.createElement("li")
      li.innerHTML = `
        <span>${escapeHtml(sys.title)}</span>
        <div>
          <span>${sys.streak || 0} 🔥</span>
          <button class="delete-btn" onclick="deleteSystem(${sys.id}, event)">🗑️</button>
        </div>
      `
      li.onclick = (e) => {
        if (!e.target.classList.contains('delete-btn')) {
          completeSystem(sys.id)
        }
      }
      return li
    }

    overview.appendChild(createSystemItem())
    full.appendChild(createSystemItem())
  })
}

async function addSystem() {
  const titleInput = document.getElementById("newSystemTitle")
  const title = titleInput.value.trim()
  
  if (!title) {
    showNotification("Please enter a system title", "error")
    return
  }

  try {
    const res = await fetch(`${API}/systems/add`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    })

    const data = await res.json()
    
    if (!data.ok) {
      throw new Error("Failed to add system")
    }

    titleInput.value = ""
    showNotification("System added!", "success")
    await init()
  } catch (error) {
    console.error("Add system failed:", error)
    showNotification("Failed to add system", "error")
  }
}

async function completeSystem(id) {
  try {
    const res = await fetch(`${API}/systems/complete`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })

    const data = await res.json()
    
    if (!data.ok) {
      throw new Error("Failed to complete system")
    }

    showNotification("System completed! 🔥", "success")
    await init()
  } catch (error) {
    console.error("Complete system failed:", error)
    showNotification("Failed to complete system", "error")
  }
}

async function deleteSystem(id, event) {
  event.stopPropagation()
  
  if (!confirm("Delete this system permanently?")) {
    return
  }

  try {
    const res = await fetch(`${API}/systems/delete`, {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    })

    const data = await res.json()
    
    if (!data.ok) {
      throw new Error("Failed to delete system")
    }

    showNotification("System deleted", "success")
    await init()
  } catch (error) {
    console.error("Delete system failed:", error)
    showNotification("Failed to delete system", "error")
  }
}

/* ---------------------------
   Utilities
--------------------------- */

function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => notification.classList.add("show"), 10)
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/* ---------------------------
   Keyboard shortcuts
--------------------------- */

document.addEventListener("keydown", (e) => {
  // Ctrl/Cmd + Enter to add focus item
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    const activeView = document.querySelector(".view.active")
    if (activeView.id === "view-overview") {
      addFocus()
    } else if (activeView.id === "view-focus") {
      addFocusFromFocus()
    } else if (activeView.id === "view-systems") {
      addSystem()
    }
  }
})

// Initialize app
init()
