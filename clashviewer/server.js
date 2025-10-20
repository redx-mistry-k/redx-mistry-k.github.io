import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;
const COC_TOKEN = process.env.COC_TOKEN; // Replace this with your real token

app.use(cors());
app.use(express.json());
app.use(express.static("public")); // serves cocoptimizer.html

// Root route (optional)
app.get("/", (req, res) => {
  res.sendFile("cocoptimizer.html", { root: "public" });
});

// Clash of Clans proxy route
app.get("/api/player/:tag", async (req, res) => {
  const playerTag = req.params.tag.replace("#", "%23"); // encode #
  try {
    const response = await fetch(
      `https://api.clashofclans.com/v1/players/${playerTag}`,
      {
        headers: {
          Authorization: `Bearer ${COC_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Failed to fetch data from COC API" });
  }
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
