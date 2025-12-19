const express = require("express");
const Contact = require("../models/contact");
const router = express.Router();

// Landing: submit contact form
router.post("/", async (req, res) => {
  try {
    const { fullName, email, mobile, city } = req.body;
    const contact = await Contact.create({ fullName, email, mobile, city });
    res.status(201).json({ message: "Contact submitted", contact });
  } catch (err) {
    res.status(400).json({ message: "Failed to submit contact form" });
  }
});

// Admin: view all contact submissions
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

module.exports = router;
