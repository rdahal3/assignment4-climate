// server.js
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8080;

// Load real project data from your module
const projects = require("./modules/projects");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects", (req, res) => {
  res.render("projects", { projects });
});

app.get("/projects/:id", (req, res) => {
  const projectId = req.params.id;
  const project = projects.find(p => p.id === projectId || p.id == Number(projectId));
  
  if (project) {
    res.render("project", { project }); // Make sure you have a `project.ejs` view
  } else {
    res.status(404).render("404");
  }
});

// 404 fallback
app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
