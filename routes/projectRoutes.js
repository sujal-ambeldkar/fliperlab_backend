const express = require("express");
const Project = require("../models/project");
const upload = require("../uploadMiddleware");      // NEW
const cloudinary = require("../cloudinary");        // NEW

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

// Admin: create project with image upload
// expects multipart/form-data with fields: image (file), name, description
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload buffer to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "fliperlab/projects" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const result = await uploadPromise; // result.secure_url etc.

    const project = await Project.create({
      name,
      description,
      imageUrl: result.secure_url,  // save CDN URL
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("Create project error:", err);
    res.status(400).json({ message: "Failed to create project" });
  }
});

module.exports = router;
