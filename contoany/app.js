const WORKER_URL = "https://or-con-api.vkrishnaanand.workers.dev/convert";

/* ===================== MAIN CONVERT ===================== */

async function convertData() {
  const mode = document.getElementById("conversionMode").value;
  const input = document
    .getElementById("inputData")
    .value
    .replace(/\r/g, "")
    .trim();

  if (!input) return;

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mode, input })
    });

    // Cloudflare free-tier limit or backend down
    if (!res.ok) {
      if (res.status === 429 || res.status === 503) {
        alert(
          "Service temporarily unavailable. Please try later after 5am."
        );
        return;
      }
      throw new Error(`Backend error: ${res.status}`);
    }

    const { rows, columns } = await res.json();

    // 🔒 Blank ID & MirrorID before displaying / copying
    const safeRows = blankSensitiveColumns(rows, columns);

    document.getElementById("outputData").value = safeRows
      .map(r => r.join("\t"))
      .join("\n");

    document.getElementById("rowCount").textContent =
      `Rows: ${safeRows.length}`;

    renderPreview(safeRows, columns);

  } catch (err) {
    console.error(err);
    alert(
      "Service temporarily unavailable. Please try later after 5am."
    );
  }
}

/* ===================== BLANK SENSITIVE COLUMNS ===================== */

function blankSensitiveColumns(rows, columns) {
  const blankCols = new Set(["ID", "MirrorID"]);

  return rows.map(row =>
    row.map((value, idx) =>
      blankCols.has(columns[idx]) ? "" : value
    )
  );
}

/* ===================== COPY OUTPUT ===================== */

function copyOutput() {
  const output = document.getElementById("outputData");
  if (!output.value) return;

  output.select();
  document.execCommand("copy");
}

/* ===================== PREVIEW TABLE ===================== */

function renderPreview(rows, columns) {
  const thead = document.querySelector("#previewTable thead");
  const tbody = document.querySelector("#previewTable tbody");

  thead.innerHTML = "";
  tbody.innerHTML = "";

  const headRow = document.createElement("tr");
  columns.forEach(col => {
    const th = document.createElement("th");
    th.textContent = col;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);

  rows.slice(0, 10).forEach(r => {
    const tr = document.createElement("tr");
    r.forEach(v => {
      const td = document.createElement("td");
      td.textContent = v;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}
