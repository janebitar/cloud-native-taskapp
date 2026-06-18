const express = require("express");
const path = require("path");
const tasks = require("./tasks");

function createApp() {
  const app = express();

  // Middleware to read JSON
  app.use(express.json());

  // Serve frontend files (static site)
  app.use(express.static(path.join(__dirname, "..", "public")));

  // Health check (used in CI/CD pipelines)
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Get all tasks
  app.get("/api/tasks", (req, res) => {
    res.json(tasks.getAllTasks());
  });

  // Create task
  app.post("/api/tasks", (req, res) => {
    const { title } = req.body || {};

    try {
      const task = tasks.addTask(title);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  // Delete task
  app.delete("/api/tasks/:id", (req, res) => {
    const deleted = tasks.deleteTask(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(204).send();
  });

  return app;
}

module.exports = createApp;