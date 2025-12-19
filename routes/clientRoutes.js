const express = require("express");
const Client = require("../models/client");
const upload = require("../uploadMiddleware");   // NEW
const cloudinary = require("../cloudinary");     // NEW

const router = express.Router();

// Landing: get all clients
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch clients" });
  }
});

// Admin: create client with image upload
// expects multipart/form-data with: image (file), name, description, designation
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, description, designation } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Upload buffer to Cloudinary
    const uploadPromise = new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "fliperlab/clients" },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
      stream.end(req.file.buffer);
    });

    const result = await uploadPromise; // result.secure_url, etc.

    const client = await Client.create({
      name,
      description,
      designation,
      imageUrl: result.secure_url,   // save Cloudinary URL
    });

    res.status(201).json(client);
  } catch (err) {
    console.error("Create client error:", err);
    res.status(400).json({ message: "Failed to create client" });
  }
});

module.exports = router;
