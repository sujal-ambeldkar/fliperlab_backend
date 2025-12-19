const express = require("express");
const Project = require("../models/Project");
const router = express.Router();

// GET all projects
router.get("/", async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json({ success: true, data: projects });
  } catch (err) {
    next(err);
  }
});

// CREATE project (JSON body)
router.post("/", async (req, res, next) => {
  try {
    const { title, description, imageUrl } = req.body; // imageUrl is just a string if you need it
    const project = await Project.create({ title, description, imageUrl });
    res.status(201).json({ success: true, data: project });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
