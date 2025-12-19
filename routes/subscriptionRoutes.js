const express = require("express");
const Subscription = require("../models/subscription");
const router = express.Router();

// Landing: subscribe email
router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email required" });

    const existing = await Subscription.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: "Already subscribed" });
    }

    const sub = await Subscription.create({ email });
    res.status(201).json({ message: "Subscribed", subscription: sub });
  } catch (err) {
    res.status(400).json({ message: "Failed to subscribe" });
  }
});

// Admin: list all subscriptions
router.get("/", async (req, res) => {
  try {
    const subs = await Subscription.find().sort({ createdAt: -1 });
    res.json(subs);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch subscriptions" });
  }
});

module.exports = router;
