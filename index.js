const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();

const app = express();
connectDB();

/* ---- CORS CONFIG (FIXED) ---- */
const allowedOrigins = [
  "https://fliperlabfrontend.vercel.app",
  "https://fliperlabfrontend-mmj610th6-sujal-ambeldkars-projects.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000"
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman / server-side
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, false); // ❗ don't throw error
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
/* ----------------------------- */

app.use(express.json());

app.use("/api/v1/projects", require("./routes/projectRoutes"));
app.use("/api/v1/clients", require("./routes/clientRoutes"));
app.use("/api/v1/contacts", require("./routes/contactRoutes"));
app.use("/api/v1/subscriptions", require("./routes/subscriptionRoutes"));

app.get("/", (req, res) => {
  res.send("Fliperlab Agency Backend is Running 🚀");
});

app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date()
  });
});

// Global error handler (safe)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);
  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error"
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
