const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");

dotenv.config();

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    const app = express();

    // Middleware
    app.use(cors({
      origin: "https://fliperlabfrontend.vercel.app",
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
    }));

    app.use(express.json());

    // Routes
    app.use("/api/v1/projects", require("./routes/projectRoutes"));
    app.use("/api/v1/clients", require("./routes/clientRoutes"));
    app.use("/api/v1/contacts", require("./routes/contactRoutes"));
    app.use("/api/v1/subscriptions", require("./routes/subscriptionRoutes"));

    // Test route
    app.get("/", (req, res) => {
      res.send("Fliperlab Agency Backend is Running 🚀");
    });

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1); // exit if DB connection fails
  }
};

startServer();
