/********************************************************************************
*  WEB322 – Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Reejan Dahal  Student ID: 15672224  Date: 2025-06-15
* Hosted URL: https://assignment-3-rjg8.vercel.app
********************************************************************************/

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

// Read project data safely
const dataPath = path.join(__dirname, "data", "projectData.json");
let projects = [];
try {
  const fileData = fs.readFileSync(dataPath, "utf-8");
  projects = JSON.parse(fileData);
} catch (err) {
  console.error("Failed to load project data:", err.message);
}

// Map sector IDs to names
const sectorMap = {
  1: "energy",
  2: "transportation",
  3: "industry"
};

// Serve static files
app.use(express.static("public"));

// Home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "home.html"));
});

// About route
app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

// All or filtered projects (by ?sector=)
app.get("/solutions/projects", (req, res) => {
  try {
    const sector = req.query.sector;
    if (sector) {
      const filtered = projects.filter(p =>
        sectorMap[p.sector_id]?.toLowerCase() === sector.toLowerCase()
      );
      if (filtered.length > 0) {
        res.json(filtered);
      } else {
        res.status(404).json({ error: "No projects found in that sector" });
      }
    } else {
      res.json(projects);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to load projects" });
  }
});

// Individual project by ID
app.get("/solutions/projects/:id", (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const project = projects.find(p => p.id === id);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (err) {
    res.status(404).json({ error: "Error fetching project" });
  }
});

// 404 fallback
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
