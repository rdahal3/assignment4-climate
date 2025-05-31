const projectData = require("../data/projectData");
const sectorData = require("../data/sectorData");

let projects = [];

function initialize() {
  return new Promise((resolve, reject) => {
    try {
      projects = projectData.map((proj) => {
        const sector = sectorData.find(s => s.id === proj.sector_id);
        return {
          ...proj,
          sector: sector ? sector.name : "Unknown"
        };
      });
      resolve();
    } catch (err) {
      reject("Unable to initialize project data");
    }
  });
}

function getAllProjects() {
  return new Promise((resolve, reject) => {
    if (projects.length > 0) {
      resolve(projects);
    } else {
      reject("No project data available");
    }
  });
}

function getProjectsBySector(sector) {
  return new Promise((resolve, reject) => {
    const filtered = projects.filter(p => p.sector.toLowerCase() === sector.toLowerCase());
    if (filtered.length > 0) {
      resolve(filtered);
    } else {
      reject("No projects found for sector: " + sector);
    }
  });
}

function getProjectById(id) {
  return new Promise((resolve, reject) => {
    const found = projects.find(p => p.id === id);
    if (found) {
      resolve(found);
    } else {
      reject("No project found with ID: " + id);
    }
  });
}

// ⛔️ This part is critical!
module.exports = {
  initialize,
  getAllProjects,
  getProjectsBySector,
  getProjectById
};
