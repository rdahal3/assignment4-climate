const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data/projectData.json");

let projects = [];

try {
  const data = fs.readFileSync(dataPath, "utf-8");
  projects = JSON.parse(data);
} catch (err) {
  console.error("Failed to read or parse projectData.json:", err.message);
}

module.exports = projects;
