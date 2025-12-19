const express = require("express");
const Project = require("../models/project");
const router = express.Router();

// Landing page: get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects" });
  }
});

// Admin: create project
router.post("/", async (req, res) => {
  try {
    const { imageUrl, name, description } = req.body;
    const project = await Project.create({ imageUrl, name, description });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ message: "Failed to create project" });
  }
});

module.exports = router;
