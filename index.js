const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();

const app = express();
connectDB();

/* ===== FINAL CORS FIX ===== */
app.use(cors({
  origin: "https://fliperlabfrontend.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Explicitly handle preflight
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});
/* ========================== */

app.use(express.json());

app.use("/api/v1/projects", require("./routes/projectRoutes"));
app.use("/api/v1/clients", require("./routes/clientRoutes"));
app.use("/api/v1/contacts", require("./routes/contactRoutes"));
app.use("/api/v1/subscriptions", require("./routes/subscriptionRoutes"));

app.get("/", (req, res) => {
  res.send("Fliperlab Agency Backend is Running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
