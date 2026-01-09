const WORKER_URL = "https://YOUR-API-WORKER.workers.dev/convert";

async function convertData() {
  try {
    const mode = document.getElementById("conversionMode").value;
    const input = document.getElementById("inputData").value.trim();
    if (!input) return;

    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, input }),
    });

    if (!res.ok) throw new Error("Backend error");

    const { rows, columns } = await res.json();

    document.getElementById("outputData").value = rows
      .map((r) => r.join("\t"))
      .join("\n");

    document.getElementById("rowCount").textContent = `Rows: ${rows.length}`;

    renderPreview(rows, columns);
  } catch (e) {
    console.error(e);
    alert("Conversion failed");
  }
}

function copyOutput() {
  const output = document.getElementById("outputData");
  if (!output.value) return;
  output.select();
  document.execCommand("copy");
}

function renderPreview(rows, columns) {
  const thead = document.querySelector("#previewTable thead");
  const tbody = document.querySelector("#previewTable tbody");

  thead.innerHTML = "";
  tbody.innerHTML = "";

  const tr = document.createElement("tr");
  columns.forEach((c) => {
    const th = document.createElement("th");
    th.textContent = c;
    tr.appendChild(th);
  });
  thead.appendChild(tr);

  rows.slice(0, 10).forEach((r) => {
    const tr = document.createElement("tr");
    r.forEach((v) => {
      const td = document.createElement("td");
      td.textContent = v;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}
