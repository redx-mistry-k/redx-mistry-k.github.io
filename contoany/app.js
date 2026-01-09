const WORKER_URL = "https://or-con-api.vkrishnaanand.workers.dev/convert";

async function convertData() {
  const mode = document.getElementById("conversionMode").value;
  const input = document.getElementById("inputData").value.trim();
  if (!input) return;

  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, input }),
    });

    // Handle Cloudflare limit / backend down
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

    document.getElementById("outputData").value = rows
      .map((r) => r.join("\t"))
      .join("\n");

    document.getElementById("rowCount").textContent =
      `Rows: ${rows.length}`;

    renderPreview(rows, columns);

  } catch (err) {
    console.error(err);
    alert(
      "Service temporarily unavailable. Please try later after 5am."
    );
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


