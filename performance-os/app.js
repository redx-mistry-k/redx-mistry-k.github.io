// -----------------------------
// Mock state (will come from API later)
// -----------------------------

const state = {
  level: 3,
  xp: 120,
  nextLevelXP: 300,
  consistency: 82,

  focus: [
    { id: 1, title: "Primary objective", area: "Core", xp: 40, done: false },
    {
      id: 2,
      title: "Secondary objective",
      area: "Support",
      xp: 25,
      done: false,
    },
    {
      id: 3,
      title: "Maintenance action",
      area: "Baseline",
      xp: 15,
      done: true,
    },
  ],

  systems: [
    { id: 1, title: "Daily movement", streak: 6 },
    { id: 2, title: "Deep focus block", streak: 4 },
    { id: 3, title: "Wind-down routine", streak: 5 },
  ],

  rewards: [
    { id: 1, title: "Guilt-free leisure", cost: 100 },
    { id: 2, title: "Extended break", cost: 150 },
  ],

  performance: {
    labels: ["Focus", "Consistency", "Energy", "Output", "Recovery"],
    values: [78, 82, 65, 74, 70],
  },
};

// -----------------------------
// DOM references
// -----------------------------

const focusEl = document.getElementById("focusList");
const systemsEl = document.getElementById("systemsList");
const rewardsEl = document.getElementById("rewardsList");

// -----------------------------
// Render functions
// -----------------------------

function renderHeader() {
  document.getElementById("level").textContent = state.level;
  document.getElementById("xp").textContent = state.xp;

  const percent = Math.min((state.xp / state.nextLevelXP) * 100, 100);

  document.querySelector(".xp-fill").style.width = percent + "%";
}

function renderFocus() {
  focusEl.innerHTML = "";

  state.focus.forEach((item) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        ${item.done ? "✅" : "⬜"} ${item.title}
      </span>
      <span class="badge">
        ${item.area} · +${item.xp} XP
      </span>
    `;

    li.style.opacity = item.done ? 0.6 : 1;
    li.style.cursor = "pointer";

    li.onclick = () => toggleFocus(item.id);

    focusEl.appendChild(li);
  });
}

function renderSystems() {
  systemsEl.innerHTML = "";

  state.systems.forEach((sys) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${sys.title}</span>
      <span>${sys.streak} 🔁</span>
    `;

    systemsEl.appendChild(li);
  });
}

function renderRewards() {
  rewardsEl.innerHTML = "";

  state.rewards.forEach((r) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${r.title}</span>
      <span>${r.cost} XP</span>
    `;

    rewardsEl.appendChild(li);
  });
}

// -----------------------------
// Interactions
// -----------------------------

function toggleFocus(id) {
  const item = state.focus.find((f) => f.id === id);
  if (!item || item.done) return;

  item.done = true;
  state.xp += item.xp;

  // simple level-up logic
  if (state.xp >= state.nextLevelXP) {
    state.level++;
    state.xp = state.xp - state.nextLevelXP;
    state.nextLevelXP += 200;
  }

  renderHeader();
  renderFocus();
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
          fill: true,
        },
      ],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: {
        r: {
          grid: { color: "#374151" },
          angleLines: { color: "#374151" },
          ticks: { display: false },
        },
      },
    },
  });
}

// -----------------------------
// Init
// -----------------------------

function init() {
  // basic client-side guard (temporary)
  if (!localStorage.getItem("auth_email")) {
    window.location.href = "/login.html";
    return;
  }

  renderHeader();
  renderFocus();
  renderSystems();
  renderRewards();
  renderChart();
}

init();
