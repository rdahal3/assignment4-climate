const express = require("express");
const app = express();
const projectService = require("./modules/projects");

const HTTP_PORT = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("<h2>Welcome to Climate Projects Explorer</h2>");
});

app.get("/projects", (req, res) => {
  projectService.getAllProjects()
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: err }));
});

app.get("/projects/:id", (req, res) => {
  const id = parseInt(req.params.id);
  projectService.getProjectById(id)
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: err }));
});

app.get("/projects/sector/:sector", (req, res) => {
  projectService.getProjectsBySector(req.params.sector)
    .then(data => res.json(data))
    .catch(err => res.status(404).json({ message: err }));
});

projectService.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server listening on http://localhost:${HTTP_PORT}`);
    });
  })
  .catch(err => {
    console.error("Failed to initialize", err);
  });
