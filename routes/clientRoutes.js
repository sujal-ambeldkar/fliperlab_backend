const express = require("express");
const Client = require("../models/client");
const router = express.Router();

// GET all clients
router.get("/", async (req, res, next) => {
  try {
    const clients = await Client.find().sort({ createdAt: -1 });
    res.json({ success: true, data: clients });
  } catch (err) {
    next(err);
  }
});

// CREATE client (JSON body)
router.post("/", async (req, res, next) => {
  try {
    const { name, logoUrl } = req.body; // logoUrl is optional string
    const client = await Client.create({ name, logoUrl });
    res.status(201).json({ success: true, data: client });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
