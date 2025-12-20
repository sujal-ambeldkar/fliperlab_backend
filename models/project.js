const express = require("express");
const Project = require("../models/project");
const router = express.Router();

// ----------------- GET all projects -----------------
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    console.error("PROJECT GET ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// ----------------- CREATE project -----------------
router.post("/", async (req, res) => {
  try {
    const { name, description, imageUrl } = req.body;

    // Validate required fields
    if (!name || !description || !imageUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new project
    const project = await Project.create({ name, description, imageUrl });
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    console.error("PROJECT CREATE ERROR:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
