const express = require("express");
const Client = require("../models/client");
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

// Admin: create client
router.post("/", async (req, res) => {
  try {
    const { imageUrl, name, description, designation } = req.body;
    const client = await Client.create({
      imageUrl,
      name,
      description,
      designation,
    });
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: "Failed to create client" });
  }
});

module.exports = router;
